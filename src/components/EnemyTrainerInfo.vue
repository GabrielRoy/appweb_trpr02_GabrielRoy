<script setup lang="ts">
defineProps<{
  currentTrainer: any;
  getExperienceLabel: (exp: number) => string;
}>();
</script>

<template>
  <div class="card" v-if="currentTrainer">
    <h3>{{ currentTrainer.pokemon.name }}</h3>

    <div class="hp-bar">
      <div
        class="hp-fill"
        :class="{
          'hp-low': currentTrainer.pokemon.hp < 30,
          'hp-mid':
            currentTrainer.pokemon.hp >= 30 && currentTrainer.pokemon.hp < 60,
        }"
        :style="{
          width:
            (currentTrainer.pokemon.hp / currentTrainer.pokemon.maxHp) * 100 +
            '%',
        }"
      ></div>
    </div>

    <p>{{ currentTrainer.reward }} P$</p>
    <p>{{ getExperienceLabel(currentTrainer.experience) }}</p>
  </div>
</template>
