export async function findSummonerImg(SummonerNum, index, i, version) {
  const recentUseSummonerElement = document.getElementById(
    `SummonerIcon-${index}_${i}`
  );
  const Summonerdiv = document.createElement("div");
  Summonerdiv.className = "Summoner-div";

  if (!recentUseSummonerElement) {
    console.error(`Summoner icon element not found for match ${index}`);
    return;
  }
  recentUseSummonerElement.style.width = "30px";
  recentUseSummonerElement.style.height = "30px";

  // SummonerNum이 0이면 빈 아이콘 설정
  if (SummonerNum === 0) {
    recentUseSummonerElement.src = "../data/img/empty/empty-icon.png"; // 빈 네모 이미지 경로 설정
    recentUseSummonerElement.alt = "get Summoner error";
    return;
  }

  try {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/summoner.json`
    );
    const summonerData = await response.json();

    const SummonerInfo = Object.values(summonerData.data).find(
      (summoner) => summoner.key === String(SummonerNum)
    );

    // 소환사 주문 정보가 있을 경우
    if (SummonerInfo) {
      const recentUseSummonerIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${SummonerInfo.image.full}`;
      recentUseSummonerElement.src = recentUseSummonerIconUrl;
      recentUseSummonerElement.alt = `${SummonerInfo.name} Icon`;
    } else {
      console.error(`Summoner spell not found for SummonerNum ${SummonerNum}`);
      recentUseSummonerElement.src = "../data/img/empty/empty-icon.png";
      recentUseSummonerElement.alt = "get Summoner error";
    }
  } catch (error) {
    console.error("Error fetching summoner spell data:", error);
    recentUseSummonerElement.src = "../data/img/empty/empty-icon.png";
    recentUseSummonerElement.alt = "get Summoner error";
  }
}
