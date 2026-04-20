<script setup lang="ts">
import type { Ranking } from "../types/ranking";
import RankingScore from "../components/RankingScore.vue";
import { onMounted, ref, computed } from "vue";

const rankings = ref<Ranking[]>([]);

onMounted(async () => {
  const response = await fetch("http://127.0.0.1:3000/ranking");
  const data = await response.json();
  rankings.value = data;
});

const sortedRankings = computed(() => {
  return [...rankings.value].sort((a, b) => b.score - a.score);
});
</script>

<template>
  <div class="container">
    <h1>🏆 Classement</h1>

    <ul class="ranking-list">
      <li
        v-for="(value, index) in sortedRankings"
        :key="value.id"
        class="card ranking-item"
      >
        <RankingScore :ranking="value" :place="index + 1" />
      </li>
    </ul>
  </div>
</template>
<style scoped>
.container {
  max-width: 700px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #fff;
}

/* titre */
h1 {
  text-align: center;
  margin-bottom: 20px;
}

/* liste */
.ranking-list {
  list-style: none;
  padding: 0;
}

/* carte */
.card {
  background: #1e1e2f;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* item classement */
.ranking-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* podium couleurs */
.ranking-item:nth-child(1) {
  border-left: 6px solid gold;
}

.ranking-item:nth-child(2) {
  border-left: 6px solid silver;
}

.ranking-item:nth-child(3) {
  border-left: 6px solid #cd7f32;
}

/* texte */
.ranking-item span {
  font-size: 16px;
}

/* score */
.score {
  font-weight: bold;
  color: #4caf50;
}
</style>
