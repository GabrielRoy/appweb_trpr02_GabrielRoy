<script setup lang="ts">
defineProps<{
  player: {
    name: string;
    experience: string;
    score: number;
    team: { id: number; name: string; hp: number; maxHp: number }[];
    activePokemon: { id: number; name: string; hp: number; maxHp: number };
  };
}>();
</script>

<template>
  <div class="card">
    <h3>{{ player.activePokemon.name }}</h3>

    <div class="hp-bar">
      <div
        class="hp-fill"
        :class="{
          'hp-low': player.activePokemon.hp < 30,
          'hp-mid':
            player.activePokemon.hp >= 30 && player.activePokemon.hp < 60,
        }"
        :style="{
          width:
            (player.activePokemon.hp / player.activePokemon.maxHp) * 100 + '%',
        }"
      ></div>
    </div>

    <p>{{ player.activePokemon.hp }} / {{ player.activePokemon.maxHp }} HP</p>
  </div>
</template>
