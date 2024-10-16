import { fetchPlayerData } from "./fetchPlayerData.js";

let cooldown = false;
const countdownElement = document.getElementById("countdown");
const refreshButton = document.getElementById("refreshButton");

// 초기 데이터 로딩
fetchPlayerData();

const handleRefreshButtonClick = async () => {
  if (cooldown) return;
  await fetchPlayerData(); // 데이터 새로 고침
  cooldown = true;
  refreshButton.disabled = true; // 버튼 비활성화

  let countdown = 120; // 카운트다운 시간 (초)
  countdownElement.style.display = "block";
  countdownElement.innerText = `재시도 가능: ${countdown}초`;

  const interval = setInterval(() => {
    countdown -= 1;
    countdownElement.innerText = `재시도 가능: ${countdown}초`;

    if (countdown <= 0) {
      clearInterval(interval);
      countdownElement.style.display = "none";
      cooldown = false; // 쿨다운 종료
      refreshButton.disabled = false; // 버튼 재활성화
    }
  }, 1000);
};

// 이벤트 리스너 추가
refreshButton.addEventListener("click", handleRefreshButtonClick);
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  document.getElementById("refreshButton").style.display = "inline-block";
});
