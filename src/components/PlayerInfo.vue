<script setup lang="ts">
defineProps<{
  player: {
    name: string;
    experience: string;
    score: number;
    team: { id: number; name: string; hp: number; maxHp: number }[];
    activePokemon: { id: number; name: string; hp: number; maxHp: number };
  };
  currentBattle: number;
  totalBattles: number;
}>();
</script>

<template>
  <div class="card">
    <h2>{{ player.name }}</h2>
    <p>Score: {{ player.score }} P$</p>
    <p>Combat {{ currentBattle }} / {{ totalBattles }}</p>
  </div>
</template>
