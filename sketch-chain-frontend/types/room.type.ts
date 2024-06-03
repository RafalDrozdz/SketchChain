interface Player {
  id: string;
  nick: string;
}

interface Room {
  id: string;
  host: Player;
  players: Player[];
}
