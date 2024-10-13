export async function findItemImg(ItemNum, index, i, version) {
  const recentUseItemElement = document.getElementById(
    `ItemIcon-${index}_${i}`
  );
  const Itemdiv = document.createElement("div");
  Itemdiv.className = "Item-div";

  if (!recentUseItemElement) {
    console.error(`Item icon element not found for match ${index}`);
    return;
  }
  recentUseItemElement.style.width = "30px";
  recentUseItemElement.style.height = "30px";
  if (ItemNum === 0) {
    // 아이템 번호가 0일 때 빈 이미지 설정
    recentUseItemElement.src = "./data/img/empty-icon.png"; // 빈 네모 이미지 경로 설정
    recentUseItemElement.alt = "Empty Item Slot";
  }

  try {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/item.json`
    );
    const itemData = await response.json();
    const ItemInfo = itemData.data[ItemNum];

    if (ItemInfo) {
      const recentUseItemIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${ItemNum}.png`;
      recentUseItemElement.src = recentUseItemIconUrl;
      recentUseItemElement.alt = `${ItemInfo.name} Icon`;
    } else {
      console.error(`Item not found for ItemNum ${ItemNum}`);
      recentUseItemElement.src = "./data/img/empty-icon.png"; // 빈 네모 이미지 경로 설정
      recentUseItemElement.alt = "Empty Item Slot";
    }
  } catch (error) {
    console.error("Error fetching item data:", error);
    recentUseItemElement.src = "./data/img/empty-icon.png"; // 빈 네모 이미지 경로 설정
    recentUseItemElement.alt = "Empty Item Slot";
  }
}
