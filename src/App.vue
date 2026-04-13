<script setup lang="ts">
import Leaderboard from './components/Leaderboard.vue';
import jsonData from "./backend/db.default.json";
import { RouterLink, RouterView } from 'vue-router'

const ranking = jsonData.ranking;

function addRanking(name: string, score: number) {
  const newRanking = {
    id: ranking.length + 1,
    name: name,
    score: score
  };

  ranking.push(newRanking);
}

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/mainMenu">À propos</RouterLink>
      <RouterLink to="/about">À propos</RouterLink>
    </nav>
  </header>

  <RouterView />
  <Leaderboard :rankings="ranking"/>
</template>
