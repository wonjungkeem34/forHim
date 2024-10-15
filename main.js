import { fetchPlayerData } from "./fetchPlayerData.js";

let cooldown = false;
const countdownElement = document.getElementById("countdown");
const refreshButton = document.getElementById("refreshButton");
const buttonImage = refreshButton.querySelector(".button-image");

// 초기 데이터 로딩
fetchPlayerData();

const handleRefreshButtonClick = async () => {
  if (cooldown) return;

  cooldown = true;
  refreshButton.disabled = true; // 버튼 비활성화

  await fetchPlayerData(); // 데이터 새로 고침

  let countdown = 10; // 카운트다운 시간 (초)
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
  const refreshButton = document.getElementById("refreshButton");
  refreshButton.style.display = "block";
});
