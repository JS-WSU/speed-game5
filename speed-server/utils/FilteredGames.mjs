const FilteredGames = (games) => {
  let filteredGames = [];

  games.forEach((game) => {
    filteredGames.push({
      hostName: game.hostName,
      speedType: game.speedType,
      playerTwo: game.playerTwo.name,
    });
  });

  return filteredGames;
};

export default FilteredGames;
