export const calculateWinRate = (wins, losses) => {
  const totalGames = wins + losses;
  if (totalGames === 0) return 0; // 총 게임 수가 0일 때 승률 0% 처리
  return ((wins / totalGames) * 100).toFixed(2); // 소수점 두 자리까지 승률 계산
};
