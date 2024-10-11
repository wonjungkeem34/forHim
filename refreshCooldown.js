import { fetchPlayerData } from "./fetchPlayerData.js";

let cooldown = false;
const countdownElement = document.getElementById("countdown");

document.getElementById("refreshButton").addEventListener("click", async () => {
  console.log("버튼 클릭 이벤트 리스너가 설정되었습니다.");
  if (cooldown) return;
  cooldown = true;

  await fetchPlayerData();

  let countdown = 14;
  countdownElement.style.display = "block";
  countdownElement.innerText = `재시도 가능: ${countdown}초`;

  const interval = setInterval(() => {
    countdown -= 1;
    countdownElement.innerText = `재시도 가능: ${countdown}초`;

    if (countdown <= 0) {
      clearInterval(interval);
      countdownElement.style.display = "none";
      cooldown = false;
    }
  }, 1000);
});
