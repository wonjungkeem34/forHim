// fetchPlayerData.js
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
    `id/lol/summoner/v4/summoners/by-puuid/${puuid}`,
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
    `id/lol/league/v4/entries/by-summoner/${player["id"]}`,
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
  const tier = playerInfo[0].tier;
  const rank = playerInfo[0].rank;
  const leaguePoints = playerInfo[0].leaguePoints;
  const wins = playerInfo[0].wins;
  const losses = playerInfo[0].losses;
  const queueId = playerInfo[0].queueType;

  const rankImagePath = `shared/img/rank/Rank=${tier}.png`;
  const rankImageElement = document.getElementById("rankImage");
  rankImageElement.src = rankImagePath; // 이미지 경로 설정
  rankImageElement.alt = `${tier} ${rank} 이미지`;

  rankImageElement.onerror = () => {
    console.error("이미지를 로드하는데 실패했습니다:", rankImagePath);
  };
  document.getElementById("queueType").innerText = queueId;
  document.getElementById("tier").innerText = tier;
  document.getElementById("rank").innerText = rank;
  document.getElementById("leaguePoints").innerText = leaguePoints;
  document.getElementById("wins").innerText = wins;
  document.getElementById("losses").innerText = losses;

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
    allGamesID.push(...tmpGamesID); // 기존 배열에 추가
  }

  console.log(allGamesID); // 가져온 매치 ID 출력
  if (allGamesID.length > 0) {
    const matchDetailResponse = await fetch(
      `/puuid/lol/match/v5/matches/${allGamesID[0]}`,
      {
        headers: REQUEST_HEADERS,
      }
    );

    if (!matchDetailResponse.ok) {
      console.log("Match Detail Response status:", matchDetailResponse.status);
      const errorText = await matchDetailResponse.text();
      console.error("Error response:", errorText);
      throw new Error(errorText);
    }

    const matchResult = await matchDetailResponse.json();
    console.log("Recent Match Result:", matchResult);
    document.getElementById(
      "matchId"
    ).innerText = `Match ID: ${matchResult.metadata.matchId}`;
    document.getElementById(
      "gameMode"
    ).innerText = `게임 모드: ${matchResult.info.gameMode}`;
    document.getElementById("endOfGameResult").innerText = `결과: ${
      matchResult.info.teams[0].win ? "승리" : "패배"
    }`;
    document.getElementById(
      "gameDuration"
    ).innerText = `지속 시간: ${matchResult.info.gameDuration}초`;
    document.getElementById("mapId").innerText = `맵`;
  } else {
    console.log("No matches found.");
  }
}

// 최신 패치 버전을 가져오는 함수
async function getLatestPatchVersion() {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch the latest patch version");
  }
  const versions = await response.json();
  return versions[0];
}
