export async function findChampionImg(championName, index, version) {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`
  );

  const championData = await response.json();

  // 모든 챔피언 이름을 소문자로 변환한 객체 생성
  const championKey = Object.keys(championData.data).find(
    (key) => key.toLowerCase() === championName.toLowerCase()
  );

  if (championKey) {
    const championInfo = championData.data[championKey];
    const recentUseChampIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championInfo.image.full}`;

    const recentUseChampElement = document.getElementById(
      `championIcon-${index}`
    );
    if (recentUseChampElement) {
      recentUseChampElement.src = recentUseChampIconUrl;
      recentUseChampElement.alt = `${championInfo.name} Icon`;
    } else {
      console.error(`Champion icon element not found for match ${index}`);
    }
  } else {
    console.error("Champion not found.");
    console.log(championName);
  }
}
