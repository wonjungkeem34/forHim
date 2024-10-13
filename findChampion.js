export async function findChampionImg(championName, index, version) {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`
  );
  const championData = await response.json();

  const championInfo = championData.data[championName];
  if (championInfo) {
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
  }
}
