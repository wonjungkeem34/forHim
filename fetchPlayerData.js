import { USERNICKNAME, TAGLINE } from "./input";
import { findPlayerTeam } from "./checkTeamStatus";
import { findChampionImg } from "./findChampion";
import { getLatestPatchVersion } from "./getLatestPatchVersion";
import { findItemImg } from "./findItem";
import { findQueueName, findMapName } from "./findQueueMap";
import { rankKo } from "./data/const/rankTypes";
import { calculateGameEndTime, calculateWinRate } from "./calculator";
import { tierProcessing } from "./tierProcessing";
import { findSummonerImg } from "./findSummoner";
import { findRuneImg } from "./findRune";
const api_key = import.meta.env.VITE_RIOT_API_KEY;
// const kr = "https://kr.api.riotgames.com/";
// const asia = "https://asia.api.riotgames.com/";
const asia = "/api";
const kr = "/krapi";
//const PROXY_SERVER = "https://34gg-wonjungkeem34s-projects.vercel.app/";
const PROXY_SERVER = "";

const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
  "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  Origin: "https://developer.riotgames.com",
  "X-Riot-Token": api_key,
};

const userNickname = USERNICKNAME;
const tagLine = TAGLINE;
const encodedName = encodeURIComponent(userNickname);
document.getElementById("gameName").innerText = userNickname;
document.getElementById("tagLine").innerText = tagLine;

export async function fetchPlayerData() {
  console.log("전적 데이터를 가져옵니다.");

  const version = await getLatestPatchVersion();

  const response = await fetch(
    // 요청할 URL을 콘솔에 출력
    `${PROXY_SERVER}${asia}/riot/account/v1/accounts/by-riot-id/${encodedName}/${tagLine}`,
    {
      method: "GET",
      headers: REQUEST_HEADERS,
    }
  );

  if (!response.ok) {
    console.log("Response status:", response.status);
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error(errorText);
  }

  const player_id = await response.json();
  const puuid = player_id["puuid"];

  const playerResponse = await fetch(
    `${PROXY_SERVER}${kr}/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    {
      method: "GET",
      headers: REQUEST_HEADERS,
    }
  );

  if (!playerResponse.ok) {
    console.log("Response status:", playerResponse.status);
    const errorText = await playerResponse.text();
    console.error("Error response:", errorText);
    throw new Error(errorText);
  }

  const player = await playerResponse.json();
  const profileIconId = player["profileIconId"];
  const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`;
  const profileIconElement = document.getElementById("profileIcon");
  profileIconElement.src = profileIconUrl;
  profileIconElement.alt = "Profile Icon";
  document.querySelector("#profileIcon").style.display = "block";

  const leagueResponse = await fetch(
    `${PROXY_SERVER}${kr}/lol/league/v4/entries/by-summoner/${player["id"]}`,
    {
      method: "GET",
      headers: REQUEST_HEADERS,
    }
  );

  if (!leagueResponse.ok) {
    console.log("Response status:", leagueResponse.status);
    const errorText = await leagueResponse.text();
    console.error("Error response:", errorText);
    throw new Error(errorText);
  }

  const playerInfo = await leagueResponse.json();

  const tier = playerInfo[0].tier || "unranked";
  const [, color] = tierProcessing(tier, playerInfo[0].rank) || "";
  const leaguePoints = playerInfo[0]?.leaguePoints || 0;
  const wins = playerInfo[0]?.wins || 0;
  const losses = playerInfo[0]?.losses || 0;
  const winRate = calculateWinRate(wins, losses);
  const queueType = rankKo[playerInfo[0]?.queueType] || "";
  const summonerLevel = player["summonerLevel"];

  const tierElement = document.getElementById("tier");
  const rankElement = document.getElementById("rank");
  tierElement.style.color = color;
  rankElement.style.color = color;

  const rankImagePath = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${tier.toLowerCase()}.png`;

  document.getElementById("queueType").innerText = queueType;
  tierElement.innerText = tier;
  rankElement.innerText = playerInfo[0].rank;
  document.getElementById("leaguePoints").innerText = leaguePoints + "LP";
  document.getElementById("wins").innerText = wins + " 승";
  document.getElementById("losses").innerText = losses + " 패";
  document.getElementById("winRate").innerText = winRate + "%";
  document.getElementById("summonerLevel").innerText = summonerLevel;
  document.querySelector(".rank-info p:nth-child(1)").style.display = "block"; // 티어와 랭크, LP
  document.querySelector(".rank-info p:nth-child(2)").style.display = "block"; // 승률
  document.querySelector("#summonerLevel").style.display = "block";

  profileIconElement.addEventListener("mouseover", () => {
    profileIconElement.classList.add("hovered");
    profileIconElement.src = rankImagePath;
  });

  profileIconElement.addEventListener("mouseout", () => {
    profileIconElement.classList.remove("hovered");

    setTimeout(() => {
      profileIconElement.src = profileIconUrl;
    }, 1);
  });
  const totalGames = wins + losses;
  const r = Math.floor(totalGames / 100);
  const other = totalGames % 100;

  const allGamesID = [];
  for (let i = 0; i <= r; i++) {
    const start = i * 100;
    const count = i !== r ? 100 : other;

    const matchResponse = await fetch(
      `${PROXY_SERVER}${asia}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`,
      {
        headers: REQUEST_HEADERS,
      }
    );

    if (!matchResponse.ok) {
      console.log("Response status:", matchResponse.status);
      const errorText = await matchResponse.text();
      console.error("Error response:", errorText);
      throw new Error(errorText);
    }

    const tmpGamesID = await matchResponse.json();
    allGamesID.push(...tmpGamesID);
  }

  if (allGamesID.length > 0) {
    // 6개의 최근 매치 정보를 병렬로 가져오기
    const recentMatchesPromises = allGamesID.slice(0, 6).map(async (gameId) => {
      const matchDetailResponse = await fetch(
        `${PROXY_SERVER}${asia}/lol/match/v5/matches/${gameId}`,
        {
          headers: REQUEST_HEADERS,
        }
      );

      if (!matchDetailResponse.ok) {
        const errorText = await matchDetailResponse.text();
        console.error("Error response:", errorText);
        return null;
      }

      return await matchDetailResponse.json();
    });

    // 병렬로 요청 처리결과
    const recentMatches = await Promise.all(recentMatchesPromises);

    // 유효한 매치들만 필터링
    const validMatches = recentMatches.filter((match) => match !== null);

    const recentMatchesContainer = document.getElementById("recent-matches");
    recentMatchesContainer.innerHTML = "";

    validMatches.forEach(async (match, index) => {
      const teamInfo = findPlayerTeam(match, puuid);

      if (!teamInfo) {
        console.log("Participant not found for puuid:", puuid);
        return;
      }

      const participant = teamInfo.participant;

      const matchDiv = document.createElement("div");
      matchDiv.className = "match-item";

      const queueName = await findQueueName(match.info.queueId);
      const mapName = await findMapName(match.info.mapId);

      const gameEndTime = calculateGameEndTime(match.info.gameEndTimestamp);
      matchDiv.innerHTML = `
 <div >

  <div class="Top-matchInfo">
    <div class="time-box">
      ${gameEndTime}
    </div>
       <div class="result-box ${teamInfo.win ? "win" : "lose"}">
        <p>${teamInfo.win ? "승리" : "패배"}</p>
      </div>
          </div>
    <div class="matchInfo-box">
      <div class="champProfileBox">
        <img id="championIcon-${index}" alt="${
        participant.championName
      } Icon" />
        <p class="matchChampLevel">Level : ${participant.champLevel}</p>
      </div>
      <div class="textInfo-box">
        <div class="queueWinLose">
          <p >${queueName}</p>
          <p style="color: ${
            teamInfo.win ? "green" : "red"
          }; font-weight:"bold"">
            ${teamInfo.win ? "승리" : "패배"}
       <p class="timestamp">
  ${String(Math.floor(match.info.gameDuration / 60)).padStart(2, "0")}:${String(
        match.info.gameDuration % 60
      ).padStart(2, "0")}
</p>

        </div>
   
        <!--<p>${mapName}</p>-->
        <div class="kda-box">
        <div class ="kda">
        <p>${participant.kills}</p>
        <p>/</p>
        <p>${participant.deaths}</p>
           <p>/</p>
        <p>${participant.assists}</p>
        </div>
        
       <p class="kda-per" >( ${
         participant.deaths > 0
           ? (
               (participant.kills + participant.assists) /
               participant.deaths
             ).toFixed(2)
           : "Perfect KDA"
       }:1 )</p> 
</div>
         <!-- <p>Gold ${participant.goldEarned}</p>-->
      </div>
    </div>
  </div>
`;

      // 챔피언 이미지 추가
      findChampionImg(participant.championName, index, version);

      // 아이템 컨테이너 생성
      const itemContainer = document.createElement("div");
      itemContainer.className = "item-container"; // 클래스 이름 추가
      for (let i = 0; i < 6; i++) {
        const itemImg = document.createElement("img");
        itemImg.id = `ItemIcon-${index}_${i}`;
        itemImg.alt = `Item ${i}`;
        itemContainer.appendChild(itemImg);
      }
      matchDiv.appendChild(itemContainer);

      // recentMatchesContainer에 matchDiv 추가
      recentMatchesContainer.appendChild(matchDiv);

      // 아이템 이미지 업데이트
      for (let i = 0; i < 6; i++) {
        await findItemImg(participant[`item${i}`], index, i, version);
      }

      // Summoner and Rune Container 생성
      const summonerAndRuneContainer = document.createElement("div");
      summonerAndRuneContainer.className = "SR-container";

      // SummonerContainer 생성
      const summonerContainer = document.createElement("div");
      summonerContainer.className = "summoner-container";

      // 주문 이미지 추가
      for (let i = 0; i < 2; i++) {
        const summonerImg = document.createElement("img");
        summonerImg.id = `SummonerIcon-${index}_${i}`;
        summonerImg.alt = `Summoner ${i + 1}`; // alt 텍스트 수정
        summonerContainer.appendChild(summonerImg);
      }

      // 룬 컨테이너 생성
      const runeContainer = document.createElement("div");
      runeContainer.className = "rune-container";

      // 룬 이미지 추가
      for (let i = 0; i < 2; i++) {
        const runeImg = document.createElement("img");
        runeImg.id = `RuneIcon-${index}_${i}-${i === 0 ? "main" : "sub"}`;
        runeImg.alt = `Rune ${i === 0 ? "Main" : "Sub"}`; // alt 텍스트 수정
        runeContainer.appendChild(runeImg);
      }

      // summonerAndRuneContainer에 summonerContainer와 runeContainer 추가
      summonerAndRuneContainer.appendChild(summonerContainer);
      summonerAndRuneContainer.appendChild(runeContainer);

      // matchInfo-box에 summonerAndRuneContainer 추가
      const matchInfoBox = matchDiv.querySelector(".matchInfo-box");
      const champProfileBox = matchDiv.querySelector(".champProfileBox");
      matchInfoBox.insertBefore(
        summonerAndRuneContainer,
        champProfileBox.nextSibling
      );

      // 주문 이미지 업데이트
      for (let i = 0; i < 2; i++) {
        await findSummonerImg(
          participant[`summoner${i + 1}Id`],
          index,
          i,
          version
        );
      }

      // 룬 이미지 업데이트
      const firstStyle = participant.perks.styles[0].selections[0].perk;
      const secondStyle = participant.perks.styles[1].style;
      await findRuneImg(firstStyle, index, 0, version);
      await findRuneImg(secondStyle, index, 1, version);

      matchDiv.innerHTML += `
      <div>
        <div style="text-align: right;">
        <button class="toggle-details">open</button>
    </div>
      <div class="match-details" style="display: none;">
   <p style="text-align:left; margin-top: 1vw; font-size: 1.5em; ">상세 전적 정보</p>
  <table class="match-info-table">
  <tr><td>포지션</td><td class="note-info-td">${
    participant.teamPosition
  }</td></tr>
  <tr><td>챔피언 경험치</td><td class="value">${
    participant.champExperience
  }</td></tr>
  <tr><td>제어 와드 설치</td><td class="value">${
    participant.detectorWardsPlaced
  }</td></tr>
  <tr><td>골드 획득</td><td class="value">${participant.goldEarned}</td></tr>
  <tr><td >골드 사용</td><td class="value">${participant.goldSpent}</td></tr>
  <tr><td>아이템 구매</td><td class="value">${
    participant.itemsPurchased
  }</td></tr>
  <tr><td>스킬 사용 횟수</td><td class="value">${
    participant.spell1Casts +
    participant.spell2Casts +
    participant.spell3Casts +
    participant.spell4Casts
  }</td></tr>
  <tr><td >학살중입니다 콜 횟수</td><td class="value">${
    participant.killingSprees
  }</td></tr>
  <tr><td >최대 연속 처치</td><td class="value">${
    participant.largestKillingSpree
  }</td></tr>
  <tr><td >입힌 데미지 총합</td><td class="value">${
    participant.totalDamageDealt
  }</td></tr>
  <tr><td >챔피언에게 입힌 데미지</td><td class="value">${
    participant.totalDamageDealtToChampions
  }</td></tr>
  <tr><td >받은 데미지 총합</td><td class="value">${
    participant.totalDamageTaken
  }</td></tr>
  <tr><td>마법 피해 총량</td><td class="value">${
    participant.magicDamageDealt
  }</td></tr>
  <tr><td>챔피언에게 입힌 마법 피해</td><td class="value">${
    participant.magicDamageDealtToChampions
  }</td></tr>
  <tr><td  >입은 마법 피해</td><td class="value">${
    participant.magicDamageTaken
  }</td></tr>
  <tr><td  >힐 총합</td><td class="value">${participant.totalHeal}</td></tr>
  <tr><td  >팀원에게 힐 총합</td><td class="value">${
    participant.totalHealsOnTeammates
  }</td></tr>
  <tr><td  >총 미니언 처치 수</td><td class="value">${
    participant.totalMinionsKilled
  }</td></tr>
  <tr><td  >첫 킬 어시스트</td><td class="value">${
    participant.firstKillAssist ? "예" : "아니오"
  }</td></tr>
  <tr><td  >FirstBlood</td><td class="value">${
    participant.firstBlood ? "예" : "아니오"
  }</td></tr>
  <tr><td  >킬</td><td class="note-info-td" >${participant.kills}</td></tr>
  <tr><td  >죽음</td><td class="note-info-td">${participant.deaths}</td></tr>
  <tr><td  >드래곤 킬</td><td class="value">${participant.dragonKills}</td></tr>
  <tr><td  >바론 킬</td><td class="value">${participant.baronKills}</td></tr>
  <tr><td  >포탑 킬</td><td class="value">${participant.turretKills}</td></tr>
  <tr><td  >첫 포탑킬</td><td class="value">${
    participant.firstTowerKill
  }</td></tr>
  <tr><td  >첫 포탑킬 어시스트</td><td class="value">${
    participant.firstTowerAssist
  }</td></tr>
  <tr><td  >총 어시스트</td><td class="note-info-td">${
    participant.assists
  }</td></tr>
  <tr><td  >최대 치명타</td><td class="value">${
    participant.largestCriticalStrike
  }</td></tr>
  <tr><td  >최대 연속 킬 횟수</td><td class="value">${
    participant.largestKillingSpree
  }</td></tr>
  <tr><td  >최대 다중 킬</td><td class="value">${
    participant.largestMultiKill
  }</td></tr>
  <tr><td  >최장 생존 시간</td><td class="value">${
    participant.longestTimeSpentLiving
  }</td></tr>
  <tr><td>팀 승리 여부</td><td class="note-info-td">${
    participant.win ? "승리" : "패배"
  }</td></tr>
</table>

      </div>
      </div>
  `;
    });
  }
}
