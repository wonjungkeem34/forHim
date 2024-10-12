import { fetchPlayerData } from "./fetchPlayerData.js";

let cooldown = false;
const countdownElement = document.getElementById("countdown");

fetchPlayerData();

refreshButton.addEventListener("click", async () => {
  if (cooldown) return;
  cooldown = true;

  refreshButton.disabled = true;
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
      refreshButton.disabled = false;
    }
  }, 1000);
});
