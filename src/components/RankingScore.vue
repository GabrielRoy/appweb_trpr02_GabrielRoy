<script setup lang="ts">
import type { Ranking } from "../types/ranking";

const props = defineProps<{
  place: number;
  ranking: Ranking;
}>();
</script>

<template>
  <div class="ranking-row">
    <div class="left">
      <span class="place">#{{ place }}</span>
      <span class="name">{{ ranking.name }}</span>
    </div>

    <div class="right">
      <span class="score">{{ ranking.score }} P$</span>
    </div>
  </div>
</template>

<style scoped>
.ranking-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #fff;
}

/* gauche */
.left {
  display: flex;
  gap: 10px;
  align-items: center;
}

.place {
  font-weight: bold;
  font-size: 18px;
  color: #bbb;
}

.name {
  font-size: 16px;
}

/* score */
.score {
  font-weight: bold;
  color: #4caf50;
  font-size: 16px;
}

/* PODIUM 🔥 */
:host(:nth-child(1)) .place {
  color: gold;
}

:host(:nth-child(2)) .place {
  color: silver;
}

:host(:nth-child(3)) .place {
  color: #cd7f32;
}
</style>
