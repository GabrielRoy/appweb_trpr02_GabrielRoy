import type { Pokemon } from "./pokemon";

export type GameInformation = {
    "trainerName": string,
    "pokemonTeam": (Pokemon | null)[],
    "score": number
}