import { MapKo } from "./data/const/mapTypes";
import { QueueKo } from "./data/const/queueTypes";

export async function findQueueName(queueId) {
  try {
    const response = await fetch(
      `https://static.developer.riotgames.com/docs/lol/queues.json`
    );
    const queueData = await response.json();
    // queueId에 해당하는 큐 정보를 찾기
    const queueInfo = queueData.find((queue) => queue.queueId === queueId);

    if (queueInfo) {
      const queueName = queueInfo.description;
      const queuekoName = QueueKo[queueName] || "undefined"; // 한국어 이름 가져오기
      //   console.log(`Queue Name: ${queueName}, Korean Name: ${queuekoName}`);
      return queuekoName; // 큐 이름을 반환
    } else {
      console.error("Queue not found for queueId:", queueId);
      return "undefined"; // 큐를 찾지 못한 경우 undefined 반환
    }
  } catch (error) {
    console.error("Failed to fetch queue data", error);
    return "undefined"; // 오류 발생 시 undefined 반환
  }
}
export async function findMapName(mapId) {
  try {
    const response = await fetch(
      `https://static.developer.riotgames.com/docs/lol/maps.json`
    );
    const mapData = await response.json();

    const mapInfo = mapData.find((map) => map.mapId === mapId);

    if (mapInfo) {
      const mapName = mapInfo.mapName;
      const mapKoName = MapKo[mapName] || "undefined"; // 한국어 이름 가져오기

      //   console.log(`Map Name: ${mapName}, Korean Name: ${mapKoName}`);
      return mapKoName; // 맵 이름과 한국어 이름을 반환
    } else {
      console.error("Map not found for mapId:", mapId);
      return "undefined"; // 맵을 찾지 못한 경우 undefined 반환
    }
  } catch (error) {
    console.error("Failed to fetch map data", error);
    return "undefined"; // 오류 발생 시 undefined 반환
  }
}
