<script setup lang="ts">
defineProps<{
  checkIfAllPokemonKO: () => boolean;
  playTurn: () => void;
  nextBattle: () => void;
  pushToLeaderboard: () => Promise<void>;
  currentTrainer: any;
  currentBattle: number;
  totalBattles: number;
}>();
</script>

<template>
  <div class="card">
    <button
      v-if="
        currentTrainer &&
        currentTrainer.pokemon.hp > 0 &&
        !checkIfAllPokemonKO()
      "
      @click="playTurn"
    >
      ⚡ Attaquer
    </button>

    <button
      v-if="
        currentBattle < totalBattles &&
        currentTrainer &&
        currentTrainer.pokemon.hp <= 0
      "
      @click="nextBattle"
    >
      ➡️ Next Battle
    </button>

    <button
      v-if="
        currentBattle === totalBattles &&
        currentTrainer &&
        currentTrainer.pokemon.hp <= 0
      "
      @click="pushToLeaderboard"
    >
      <router-link to="/leaderboard"
        >🏆 Terminer et Enregistrer Score</router-link
      >
    </button>
  </div>
</template>
