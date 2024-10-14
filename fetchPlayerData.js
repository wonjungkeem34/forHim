// fetchPlayerData.js

import { USERNICKNAME, TAGLINE } from "./input";
import { findPlayerTeam } from "./checkTeamStatus";
import { findChampionImg } from "./findChampion";
import { getLatestPatchVersion } from "./getLatestPatchVersion";
import { findItemImg } from "./findItem";
import { findQueueName, findMapName } from "./findQueueMap";
import { rankKo } from "./data/const/rankTypes";
import { calculateGameEndTime } from "./calculateGameEndTime";
import { calculateWinRate } from "./calculateWinRate";
import { tierProcessing } from "./tierProcessing";
const api_key = import.meta.env.VITE_RIOT_API_KEY;

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
    `/puuid/riot/account/v1/accounts/by-riot-id/${encodedName}/${tagLine}`,
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
    `/id/lol/summoner/v4/summoners/by-puuid/${puuid}`,
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

  // Fetch league information
  const leagueResponse = await fetch(
    `/id/lol/league/v4/entries/by-summoner/${player["id"]}`,
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

  // Consolidate tier and rank fetching
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

  const rankImagePath = `./data/img/rank/Rank=${tier}.png`;

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
      `/puuid/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`,
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
    // 10개의 최근 매치 정보를 병렬로 가져오기
    const recentMatchesPromises = allGamesID
      .slice(0, 10)
      .map(async (gameId) => {
        const matchDetailResponse = await fetch(
          `/puuid/lol/match/v5/matches/${gameId}`,
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

    // 병렬로 요청을 처리한 결과를 기다림
    const recentMatches = await Promise.all(recentMatchesPromises);

    // 유효한 매치들만 필터링
    const validMatches = recentMatches.filter((match) => match !== null);
    console.log(validMatches);
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

      // 매치 아이템 HTML
      matchDiv.innerHTML = `
      <div>
       <div class="time-box">
      ${gameEndTime}
    </div>

      <div class="matchInfo-box">
       
        <div class="champProfileBox">
          <img
          id="championIcon-${index}"  // 고유 ID 생성
          alt="${participant.championName} Icon"
        />
        <p class="matchChampLevel">Level : ${participant.champLevel}</p>
        </div>

        <div class="textInfo-box">
        <div class="queueWinLose">
        <p>${queueName}</p>
        <p style="color: ${teamInfo.win ? "green" : "red"};">
        ${teamInfo.win ? "승리" : "패배"}
        </p>
        </div>
        <p>지속 시간: ${Math.floor(match.info.gameDuration / 60)}분 ${
        match.info.gameDuration % 60
      }초</p>
     
        <p>${mapName}</p>
        <p>Champion: ${participant.championName}</p>
        <p>K ${participant.kills}</p>
        <p>D ${participant.deaths}</p>
        <p>A ${participant.assists}</p>
        <p>Gold ${participant.goldEarned}</p>
        </div>
      </div>
    </div>
      `;

      findChampionImg(participant.championName, index, version);

      const itemContainer = document.createElement("div");
      itemContainer.className = "item-container"; // 클래스 이름 추가
      for (let i = 0; i < 6; i++) {
        const itemImg = document.createElement("img");
        itemImg.id = `ItemIcon-${index}_${i}`;
        itemImg.alt = `Item ${i}`;
        itemContainer.appendChild(itemImg);
      }
      matchDiv.appendChild(itemContainer);
      recentMatchesContainer.appendChild(matchDiv);

      for (let i = 0; i < 6; i++) {
        await findItemImg(participant[`item${i}`], index, i, version);
      }
      matchDiv.innerHTML += `
      <button class="toggle-details">펼치기</button>
      <div class="match-details" style="display: none;">
          <p class="bold">상세 전적 정보</p> 
          <p>포지션 : ${participant.teamPosition}</p>
          <p>챔피언 경험치 : ${participant.champExperience} </p>
          <p>제어 와드 설치 : ${participant.detectorWardsPlaced} 🛡️</p>
          <p>골드 획득 : ${participant.goldEarned} 💰</p>
          <p>골드 사용 : ${participant.goldSpent} 💸</p>
          <p>아이템 구매 : ${participant.itemsPurchased} 🛒</p>
          <p>스킬 사용 횟수 : ${
            participant.spell1Casts +
            participant.spell2Casts +
            participant.spell3Casts +
            participant.spell4Casts
          } 🔮</p>
          <p>학살중입니다 콜 횟수 : ${participant.killingSprees} 💀</p>
          <p>최대 연속 처치 : ${participant.largestKillingSpree} 🥇</p>
          <p>입힌 데미지 총합 : ${participant.totalDamageDealt} ⚔️</p>
          <p>챔피언에게 입힌 데미지 : ${
            participant.totalDamageDealtToChampions
          } 🎯</p>
          <p>받은 데미지 총합 : ${participant.totalDamageTaken} 🛡️</p>
          <p>마법 피해 총량 : ${participant.magicDamageDealt} 🔮</p>
          <p>챔피언에게 입힌 마법 피해 : ${
            participant.magicDamageDealtToChampions
          } ✨</p>
          <p>입은 마법 피해 : ${participant.magicDamageTaken} 💔</p>
          <p>힐 총합 : ${participant.totalHeal} 💖</p>
          <p>팀원에게 힐 총합 : ${participant.totalHealsOnTeammates} 🤝</p>
          <p>총 미니언 처치 수 : ${participant.totalMinionsKilled} 🐭</p>
          <p>첫 킬 어시스트 : ${
            participant.firstKillAssist ? "예" : "아니오"
          } 🔗</p>
          <p>FirstBlood : ${participant.firstBlood ? "예" : "아니오"} 🩸</p>
          <p>킬 : ${participant.kills} ⚔️</p>
          <p>죽음 : ${participant.deaths} 💀</p>
          <p>드래곤 킬 : ${participant.dragonKills} 🐉</p>
          <p>바론 킬 : ${participant.baronKills} 👑</p>
          <p>포탑 킬 : ${participant.turretKills} 🏰</p>
          <p>첫 포탑킬 : ${participant.firstTowerKill} 🚩</p>
          <p>첫 포탑킬 어시스트 : ${participant.firstTowerAssist} 🤝</p>
          <p>총 어시스트 : ${participant.assists} 🌟</p>
          <p>최대 치명타: ${participant.largestCriticalStrike} 💥</p>
          <p>최대 연속 킬 횟수 : ${participant.largestKillingSpree} 🥇</p>
          <p>최대 다중 킬 : ${participant.largestMultiKill} 🔥</p>
          <p>최장 생존 시간 : ${participant.longestTimeSpentLiving} 초 ⏱️</p>
          <p>팀 승리 여부: ${participant.win ? "🏆 승리" : "💔 패배"}</p>
      </div>
  `;
    });
  }
}

// 페이지가 로드된 후 이벤트 리스너 등록
document.addEventListener("DOMContentLoaded", function () {
  const recentMatchesContainer = document.getElementById("recent-matches");

  // matchDiv 각각에 대해 버튼 클릭 시 토글 기능을 추가
  recentMatchesContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("toggle-details")) {
      // 토글 버튼 클릭 시 작동
      const matchDetailsDiv = event.target.nextElementSibling;

      if (matchDetailsDiv.classList.contains("open")) {
        matchDetailsDiv.classList.remove("open"); // 상세 정보 숨기기
        event.target.textContent = "펼치기"; // 버튼 텍스트 변경
      } else {
        matchDetailsDiv.classList.add("open"); // 상세 정보 펼치기
        event.target.textContent = "접기"; // 버튼 텍스트 변경
      }

      if (matchDetailsDiv.classList.contains("open")) {
        matchDetailsDiv.style.display = "block"; // 펼칠 때 display를 block으로 변경
      } else {
        matchDetailsDiv.style.display = "none"; // 숨길 때 display를 none으로 변경
      }
    }
  });
});
