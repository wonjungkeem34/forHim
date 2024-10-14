// checkTeamStatus.js
export function findPlayerTeam(matchData, targetPuuid) {
  const participant = matchData.info.participants.find(
    (p) => p.puuid === targetPuuid
  );
  if (!participant) {
    return null;
  }

  const teamId = participant.teamId;

  const team = matchData.info.teams.find((t) => t.teamId === teamId);

  if (!team) {
    return null;
  }

  return {
    teamId: team.teamId,
    win: team.win,
    participant: participant,
    participants: [matchData.info.participant], // 모든 참가자 정보를 반환
  };
}
