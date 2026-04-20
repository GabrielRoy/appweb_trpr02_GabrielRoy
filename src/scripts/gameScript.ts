import { ref, computed } from "vue";
import type { GamePokemon } from "../types/gamePokemon";
import type { Trainer } from "../types/trainer";

export function useGame() {
  const currentBattle = ref(1);
  const chatMessages = ref<string[]>([]);
  const totalBattles = 5;

  const trainers = ref<any[]>([]);
  const player = ref<Trainer | null>(null);

  const hasSwitched = ref(false);

  function setPlayer(name: string, team: GamePokemon[]) {
    player.value = {
      name,
      experience: "Maitre",
      score: 0,
      team,
      activePokemon: team[0],
    };
  }

  function setTrainers(data: any[]) {
    const normalized = [];

    for (const t of data) {
      normalized.push({
        ...t,
        pokemon: {
          ...t.pokemon,
          maxHp: t.pokemon.hp,
        },
      });
    }

    trainers.value = normalized;
  }

  const currentTrainer = computed(() => {
    return trainers.value[currentBattle.value - 1];
  });

  function getHitChance(exp: number): number {
    switch (exp) {
      case 1:
        return 0.2;
      case 2:
        return 0.35;
      case 3:
        return 0.5;
      case 4:
        return 0.7;
      default:
        return 0.2;
    }
  }

  //check if hit
  function attemptHit(chance: number): boolean {
    return Math.random() < chance;
  }

  //get random damage between 3% and 6%
  function getRandomDamage(): number {
    return Math.floor(Math.random() * 4) + 3;
  }

  //base attack script
  function attack(attackerExp: number, target: any) {
    const hit = attemptHit(getHitChance(attackerExp));

    if (!hit) return;

    const percent = getRandomDamage();
    const damage = Math.floor((percent / 100) * target.maxHp);

    target.hp = Math.max(0, target.hp - damage);

    return;
  }

  //base turn script
  function playTurn() {
    if (!player.value || !currentTrainer.value) return;

    const enemy = currentTrainer.value.pokemon;
    const playerPokemon = player.value.activePokemon;

    // joueur attaque
    attack(4, enemy);

    if (enemy.hp <= 0) {
      onWinBattle(currentTrainer.value.reward);
      chatMessages.value.push(
        `Vous affrontez ${currentTrainer.value.name}, gagner et obtenuez ${currentTrainer.value.reward} points !`,
      );
      return;
    }

    // ennemi attaque
    attack(currentTrainer.value.experience, playerPokemon);

    if (playerPokemon.hp <= 0) {
      autoSwitch();
      checkGameOver();
    }

    hasSwitched.value = false;
  }

  //Add to current battle
  function nextBattle() {
    if (currentBattle.value < totalBattles) {
      currentBattle.value++;
    }
  }

  //Handle win battle
  function onWinBattle(reward: number) {
    if (!player.value) return;

    player.value.score += reward;
  }

  //Handle if player pokemon is KO, auto switch to first alive pokemon in array
  function autoSwitch() {
    if (!player.value) return;

    const nextAlive = player.value.team.find((p) => p.hp > 0);
    if (nextAlive) {
      player.value.activePokemon = nextAlive;
    }
  }

  //check if all pokemon are KO, if so, game over
  function checkGameOver() {
    if (!player.value) return;

    const alive = player.value.team.some((p) => p.hp > 0);

    if (!alive) {
      chatMessages.value.push("Game Over! Vous avez perdu.");
    }
  }

  //Push score to leaderboard
  async function pushToLeaderboard() {
    if (!player.value) return;

    const response = await fetch("http://127.0.0.1:3000/ranking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: player.value.name,
        score: player.value.score,
      }),
    });
  }

  //Switch Pokemon
  function switchPokemon(pokemon: GamePokemon) {
    if (hasSwitched.value || pokemon.hp <= 0) return;

    player.value!.activePokemon = pokemon;
    hasSwitched.value = true;
  }

  function checkIfAllPokemonKO(): boolean {
    if (!player.value) return false;

    return player.value.team.every((p) => p.hp <= 0);
  }

  function healActivePokemon(percent: number) {
    if (!player.value) return;

    const pokemon = player.value.activePokemon;

    const missingHp = pokemon.maxHp - pokemon.hp;

    if (missingHp <= 0) {
      return;
    }

    const healAmount = Math.floor((percent / 100) * pokemon.maxHp);

    const actualHeal = Math.min(healAmount, missingHp);

    const cost = actualHeal * 5;

    if (player.value.score < cost) {
      chatMessages.value.push("Pas assez de points pour soigner !");
      return;
    }

    pokemon.hp += actualHeal;
    player.value.score -= cost;

    chatMessages.value.push(`+${actualHeal}% HP pour ${cost} P$`);
  }

  return {
    // données
    player,
    currentBattle,
    totalBattles,
    currentTrainer,
    chatMessages,

    // actions
    setPlayer,
    setTrainers,
    playTurn,
    nextBattle,
    switchPokemon,
    pushToLeaderboard,
    checkIfAllPokemonKO,
    healActivePokemon,
  };
}
