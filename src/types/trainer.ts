
export interface Trainer {
    "id": number,
    "name": string,
    "reward": number,
    "experience": number,
    "pokemon": {
      "id": number,
      "name": string,
      "hp": number
    }
}