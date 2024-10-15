export async function findRuneImg(runNum, index, i, version) {
  const recentUseRuneElement = document.getElementById(
    `RuneIcon-${index}_${i}-${i === 0 ? "main" : "sub"}`
  );

  if (!recentUseRuneElement) {
    console.error(`Rune icon element not found for match ${index}`);
    return;
  }

  recentUseRuneElement.style.width = "30px";
  recentUseRuneElement.style.height = "30px";

  // runNum이 0이면 빈 아이콘 설정
  if (runNum === 0 || runNum === "undefined") {
    recentUseRuneElement.src = "/data/img/empty/empty-icon.png"; // 빈 네모 이미지 경로 설정
    recentUseRuneElement.alt = "get Rune error";
    return;
  }

  try {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/runesReforged.json`
    );
    const runesData = await response.json();

    let runeInfo;

    if (i === 0) {
      // Main 룬
      runesData.forEach((style) => {
        style.slots.forEach((slot) => {
          slot.runes.forEach((rune) => {
            if (rune.id === runNum) {
              runeInfo = rune; // 해당 룬 정보를 찾으면 저장
            }
          });
        });
      });
    } else {
      // Sub 룬
      runeInfo = runesData.find((rune) => rune.id === runNum);
    }

    if (runeInfo) {
      const recentUseRuneIconUrl = `https://ddragon.leagueoflegends.com/cdn/img/${runeInfo.icon}`;
      recentUseRuneElement.src = recentUseRuneIconUrl;
      recentUseRuneElement.alt = `${runeInfo.name} Icon`;
    } else {
      console.error(`Rune not found for runNum ${runNum}`);
      recentUseRuneElement.src =
        "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/empty-icon.png";
      recentUseRuneElement.alt = "get Rune error";
    }
  } catch (error) {
    console.error("Error fetching rune data:", error);
    recentUseRuneElement.src =
      "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/empty-icon.png";
    recentUseRuneElement.alt = "get Rune error";
  }
}
