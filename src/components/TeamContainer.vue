<script setup lang="ts">
import type { GamePokemon } from "../types/gamePokemon";
defineProps<{
  player: {
    name: string;
    experience: string;
    score: number;
    team: { id: number; name: string; hp: number; maxHp: number }[];
    activePokemon: { id: number; name: string; hp: number; maxHp: number };
  };
  switchPokemon: (pokemon: GamePokemon) => void;
}>();
</script>

<template>
  <div class="card">
    <h3>Équipe</h3>

    <div v-for="pokemon in player.team" :key="pokemon.id">
      <p>
        {{ pokemon.name }}
        ({{ pokemon.hp }}/{{ pokemon.maxHp }})
      </p>

      <div class="hp-bar">
        <div
          class="hp-fill"
          :style="{ width: (pokemon.hp / pokemon.maxHp) * 100 + '%' }"
        ></div>
      </div>

      <button
        v-if="pokemon !== player.activePokemon && pokemon.hp > 0"
        @click="switchPokemon(pokemon)"
      >
        Switch
      </button>
    </div>
  </div>
</template>
