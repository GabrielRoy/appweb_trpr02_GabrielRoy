import type { GamePokemon } from "./gamePokemon";

export interface Trainer {
  name: string;
  experience: string;
  score: number;
  team: GamePokemon[];
  activePokemon: GamePokemon;
}
