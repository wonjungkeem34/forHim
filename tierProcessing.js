// tiers.js
// import { preprocessCSS } from "vite"; // 이 줄 제거
import { tierColors } from "./data/const/tierColorTypes";

export function tierProcessing(tier, romanRank) {
  let processedRank = romanRank;

  // 특정 티어에 대한 처리
  if (
    ["CHALLENGER", "GRANDMASTER", "MASTER"].includes(tier) &&
    romanRank === "I"
  ) {
    processedRank = "I";
  }
  const color = tierColors[tier] || "#808080";
  return [processedRank, color];
}
