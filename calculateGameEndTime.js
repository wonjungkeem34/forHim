export function calculateGameEndTime(gameEndTimestamp) {
  const now = Date.now();
  const elapsed = now - gameEndTimestamp;

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
