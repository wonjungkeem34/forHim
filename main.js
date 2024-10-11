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

getLatestPatchVersion()
  .then((version) => {
    return fetch(
      `/puuid/riot/account/v1/accounts/by-riot-id/${encodedName}/${tagLine}`,
      {
        method: "GET",
        headers: REQUEST_HEADERS,
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.log("Response status:", response.status);
          return response.text().then((text) => {
            console.error("Error response:", text);
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((player_id) => {
        console.log(player_id);

        const puuid = player_id["puuid"];
        return fetch(`id/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
          method: "GET",
          headers: REQUEST_HEADERS,
        });
      })
      .then((response) => {
        if (!response.ok) {
          console.log("Response status:", response.status);
          return response.text().then((text) => {
            console.error("Error response:", text);
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((player) => {
        console.log(player);
        const profileIconId = player["profileIconId"];
        const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`;

        // 프로필 아이콘을 화면에 추가
        const iconImage = document.createElement("img");
        iconImage.src = profileIconUrl;
        iconImage.alt = "Profile Icon";
        iconImage.style.width = "48px";
        iconImage.style.height = "48px";
        document.getElementById("summoner-info").appendChild(iconImage);

        return fetch(`id/lol/league/v4/entries/by-summoner/${player["id"]}`, {
          method: "GET",
          headers: REQUEST_HEADERS,
        });
      })
      .then((response) => {
        if (!response.ok) {
          console.log("Response status:", response.status);
          return response.text().then((text) => {
            console.error("Error response:", text);
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((playerInfo) => {
        console.log(playerInfo);
        const tier = playerInfo[0].tier;
        const rank = playerInfo[0].rank;
        const leaguePoints = playerInfo[0].leaguePoints;
        const wins = playerInfo[0].wins;
        const losses = playerInfo[0].losses;

        document.getElementById("tier").innerText = tier;
        document.getElementById("rank").innerText = rank;
        document.getElementById("leaguePoints").innerText = leaguePoints;
        document.getElementById("wins").innerText = wins;
        document.getElementById("losses").innerText = losses;
      });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
