<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
const route = useRoute();

function handleNavigation(event: Event, to: string) {
  if (route.path === "/game") {
    if (!confirm("Êtes-vous sûr de vouloir quitter le jeu ?")) {
      event.preventDefault();
    }
  }
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" @click="handleNavigation($event, '/')"
        >Menu Principal</RouterLink
      >
      <RouterLink
        to="/leaderboard"
        @click="handleNavigation($event, '/leaderboard')"
        >Leaderboard</RouterLink
      >
    </nav>
  </header>
  <RouterView />
</template>
<style scoped>
/* =========================
   HEADER
========================= */
header {
  background: #020617;
  border-bottom: 1px solid #334155;
  padding: 12px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
}

/* =========================
   NAV BAR
========================= */
nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* =========================
   LIENS
========================= */
nav a {
  text-decoration: none;
  color: #e2e8f0;
  font-weight: bold;
  padding: 8px 14px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

/* hover */
nav a:hover {
  background: #1e293b;
  color: #ffffff;
}

/* lien actif */
nav a.router-link-active {
  background: #3b82f6;
  color: white;
}

/* =========================
   CONFIRM UX (optionnel style bouton)
========================= */
nav a:active {
  transform: scale(0.95);
}
</style>
