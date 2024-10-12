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
    participants: matchData.info.participants.filter(
      (p) => p.teamId === teamId
    ),
  };
}
