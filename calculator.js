export const calculateWinRate = (wins, losses) => {
  const totalGames = wins + losses;
  if (totalGames === 0) return 0; // 총 게임 수가 0일 때 승률 0% 처리
  return ((wins / totalGames) * 100).toFixed(2); // 소수점 두 자리까지 승률 계산
};
export function calculateGameEndTime(gameEndTimestamp) {
  const now = Date.now() + 9 * 60 * 60 * 1000;

  const gameEndTimeKST = gameEndTimestamp + 9 * 60 * 60 * 1000; // UTC에서 KST로 변환
  const elapsed = now - gameEndTimeKST; // 현재 시간과 한국 시간으로 변환된 게임 종료 시간의 차이

  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const timeStrings = [];

  if (days > 0) {
    timeStrings.push(`${days}d`);
  }
  if (hours > 0) {
    timeStrings.push(`${hours % 24}h`);
  }
  if (minutes > 0) {
    timeStrings.push(`${minutes % 60}m`);
  }
  //   if (seconds > 0) {
  //     timeStrings.push(`${seconds % 60}초`);
  //   }

  return timeStrings.length > 0 ? timeStrings.join(" ") + " before" : "방금";
}
