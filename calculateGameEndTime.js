// calculateGameEndTime.js

export function calculateGameEndTime(gameEndTimestamp) {
  const now = Date.now();
  const elapsed = now - gameEndTimestamp;

  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const timeStrings = [];

  if (hours > 0) {
    timeStrings.push(`${hours}시간`);
  }
  if (minutes > 0) {
    timeStrings.push(`${minutes % 60}분`);
  }
  //   if (seconds > 0) {
  //     timeStrings.push(`${seconds % 60}초`);
  //   }

  return timeStrings.length > 0 ? timeStrings.join(" ") + " 전" : "방금";
}
