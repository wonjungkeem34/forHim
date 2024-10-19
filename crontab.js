import { USERNICKNAME, TAGLINE } from "../../input";
import { getLatestPatchVersion } from "../../getLatestPatchVersion";
import { REQUEST_HEADERS, version } from "./fetchPlayerData";

export async function GET(request) {
  const userNickname = USERNICKNAME;
  const tagLine = TAGLINE;
  const encodedName = encodeURIComponent(userNickname);

  // Riot API로부터 플레이어 데이터 가져오기
  const response = await fetch(
    `${process.env.ASIA_API_BASE_URL}/riot/account/v1/accounts/by-riot-id/${encodedName}/${tagLine}`,
    {
      method: "GET",
      headers: REQUEST_HEADERS,
    }
  );

  if (!response.ok) {
    return new Response(`Error: ${response.status}`, {
      status: response.status,
    });
  }

  const playerData = await response.json();
  return new Response(JSON.stringify(playerData), { status: 200 });
}
