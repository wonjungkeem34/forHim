// fetchPlayerData.js
import { QUEUETYPE, QueueKo } from "./data/const/queueTypes";
import { MAPTYPE, MapKo } from "./data/const/mapTypes";
import { GAME_MODES } from "./data/const/gameModes";
import { findPlayerTeam } from "./checkTeamStatus";
import { findChampionImg } from "./findChampion";
import { getLatestPatchVersion } from "./getLatestPatchVersion";
const api_key = import.meta.env.VITE_RIOT_API_KEY;

const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
  "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  Origin: "https://developer.riotgames.com",
  "X-Riot-Token": api_key,
};

const userNickname = "전세민";
const tagLine = "KR1";
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

  const tier = playerInfo[0]?.tier || "Unranked";
  const rank = playerInfo[0]?.rank || "";
  const leaguePoints = playerInfo[0]?.leaguePoints || 0;
  const wins = playerInfo[0]?.wins || 0;
  const losses = playerInfo[0]?.losses || 0;
  const queueType = playerInfo[0]?.queueType || "";
  const summonerLevel = player["summonerLevel"];
  const rankImagePath = `./data/img/rank/Rank=${tier}.png`;
  const rankImageElement = document.getElementById("rankImage");

  rankImageElement.src = rankImagePath;
  rankImageElement.alt = `${tier} ${rank} 이미지`;

  rankImageElement.onload = () => {
    rankImageElement.style.display = "block";
  };

  rankImageElement.onerror = () => {
    console.error("이미지를 로드하는데 실패했습니다:", rankImagePath);
    rankImageElement.style.display = "none";
  };

  document.getElementById("queueType").innerText = queueType;
  document.getElementById("tier").innerText = tier;
  document.getElementById("rank").innerText = rank;
  document.getElementById("leaguePoints").innerText = leaguePoints;
  document.getElementById("wins").innerText = wins;
  document.getElementById("losses").innerText = losses;
  document.getElementById("summonerLevel").innerText = summonerLevel;
  document.querySelector(".rank-info p:nth-child(2)").style.display = "block"; // 티어와 랭크
  document.querySelector(".rank-info p:nth-child(3)").style.display = "block"; // LP
  document.querySelector(".rank-info p:nth-child(4)").style.display = "block"; // 승, 패

  const totalGames = wins + losses;
  const r = Math.floor(totalGames / 100);
  const other = totalGames % 100;

  const allGamesID = [];
  for (let i = 0; i <= r; i++) {
    const start = i * 100;
    const count = i !== r ? 100 : other;

    const matchResponse = await fetch(
      `/puuid/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=${start}&count=${count}`,
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
    const recentMatches = [];
    for (let i = 0; i < Math.min(5, allGamesID.length); i++) {
      const matchDetailResponse = await fetch(
        `/puuid/lol/match/v5/matches/${allGamesID[i]}`,
        {
          headers: REQUEST_HEADERS,
        }
      );

      if (!matchDetailResponse.ok) {
        console.log(
          "Match Detail Response status:",
          matchDetailResponse.status
        );
        const errorText = await matchDetailResponse.text();
        console.error("Error response:", errorText);
        continue;
      }

      const matchResult = await matchDetailResponse.json();
      recentMatches.push(matchResult);
    }

    const recentMatchesContainer = document.getElementById("recent-matches");
    recentMatchesContainer.innerHTML = "";

    recentMatches.forEach((match, index) => {
      const teamInfo = findPlayerTeam(match, puuid);

      const matchDiv = document.createElement("div");
      matchDiv.className = "match-item";
      matchDiv.classList.add(teamInfo.win ? "win" : "lose");

      // 매치 아이템 HTML
      matchDiv.innerHTML = `
              <img
          id="championIcon-${index}"  // 고유 ID 생성
          alt="${teamInfo.participant.championName} Icon"
        />
        <p>게임 모드: ${GAME_MODES[match.info.gameMode]}</p>
        <p>${teamInfo.win ? "승리" : "패배"}</p>
        <p>지속 시간: ${Math.floor(match.info.gameDuration / 60)}분 ${
        match.info.gameDuration % 60
      }초</p>
        <p>${QueueKo[QUEUETYPE[match.info.queueId]]}</p>
        <p>${MapKo[MAPTYPE[match.info.mapId]]}</p>
        <p>Champion: ${teamInfo.participant.championName}</p>
        <p>Kills: ${teamInfo.participant.kills}</p>
        <p>Deaths: ${teamInfo.participant.deaths}</p>
        <p>Assists: ${teamInfo.participant.assists}</p>
        <p>Gold Earned: ${teamInfo.participant.goldEarned}</p>

      `;

      recentMatchesContainer.appendChild(matchDiv);

      findChampionImg(teamInfo.participant.championName, index);
    });
  } else {
    console.log("No matches found.");
  }
}
