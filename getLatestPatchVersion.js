// latestPatch.js
let latestPatchVersion = null;

export async function getLatestPatchVersion() {
  // 이미 캐시에 저장된 패치 버전이 있으면 반환
  if (latestPatchVersion) {
    return latestPatchVersion;
  }

  // API를 호출하여 최신 패치 버전 가져오기
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  const versions = await response.json();

  // 최신 패치 버전을 메모리에 저장
  latestPatchVersion = versions[0];

  return latestPatchVersion;
}
