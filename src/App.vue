<script setup lang="ts">
import jsonData from "./backend/db.default.json";
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref } from 'vue';

const route = useRoute();
const ranking = ref(jsonData.ranking);

function addRanking(name: string, score: number) {
  const newRanking = {
    id: ranking.value.length + 1,
    name: name,
    score: score
  };

  ranking.value.push(newRanking);
}

function handleNavigation(event: Event, to: string) {
  if (route.path === '/game') {
    if (!confirm('Êtes-vous sûr de vouloir quitter le jeu ?')) {
      event.preventDefault();
    }
  }
}

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" @click="handleNavigation($event, '/')">Menu Principal</RouterLink>
      <RouterLink to="/leaderboard" @click="handleNavigation($event, '/leaderboard')">Leaderboard</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>
