<script setup lang="ts">
import type { Pokemon } from "../types/pokemon";
import { ref, onMounted } from "vue";
import router from "../router";

const pokemons = ref<Pokemon[]>([]);

onMounted(async () => {
  const response = await fetch("http://127.0.0.1:3000/pokemons");
  const data = await response.json();
  pokemons.value = data;
});

const errorMessages = ref<string[]>([]);

const pokemonTeam = ref<(Pokemon | null)[]>(Array(5).fill(null));
const trainerName = ref("");

function resetInformation() {
  trainerName.value = "";
  pokemonTeam.value = Array(5).fill(null);
}

function validateInformation(): boolean {
  errorMessages.value = [];
  if (trainerName.value.trim() === "") {
    errorMessages.value.push("Please enter a trainer name.");
  }

  pokemonTeam.value.forEach((pokemon, i) => {
    if (!pokemon) {
      errorMessages.value.push(`Please select a Pokemon for slot ${i + 1}.`);
    }
  });

  return errorMessages.value.length === 0;
}

function startGame() {
  if (!validateInformation()) return;

  const teamIds = pokemonTeam.value.map((p) => p?.id);

  router.push({
    path: "/game",
    query: {
      name: trainerName.value,
      team: teamIds.join(","),
    },
  });
}
</script>
<template>
  <div>
    <h1>Bienvenue dans le jeu de combat de Pokémon !</h1>
    <p>
      Dans ce jeu, vous incarnez un dresseur de Pokémon et vous devez constituer
      une équipe de 5 Pokémon pour affronter d'autres dresseurs.
    </p>
    <p>
      Pour commencer, veuillez entrer votre nom de dresseur et sélectionner vos
      Pokémon préférés pour constituer votre équipe.
    </p>
    <p>
      Une fois que vous avez constitué votre équipe, vous pouvez affronter
      d'autres dresseurs et essayer de devenir le meilleur dresseur de Pokémon !
    </p>
  </div>

  <div>
    <h2>Trainer name</h2>
    <input
      type="text"
      v-model="trainerName"
      placeholder="Enter your trainer name"
    />
  </div>

  <div>
    <h2>Pokemon selection</h2>

    <select v-for="(slot, i) in pokemonTeam" :key="i" v-model="pokemonTeam[i]">
      <option :value="null" disabled>-- Choose --</option>

      <option v-for="pokemon in pokemons" :key="pokemon.id" :value="pokemon">
        {{ pokemon.name }}
      </option>
    </select>
  </div>

  <button @click="startGame">Start Game</button>
  <button @click="resetInformation">Reset</button>

  <div v-if="errorMessages.length > 0">
    <h2>Error Messages:</h2>
    <ul>
      <li v-for="(errorMessage, index) in errorMessages" :key="index">
        {{ errorMessage }}
      </li>
    </ul>
  </div>
</template>
<style scoped>
/* container principal */
div {
  font-family: Arial, sans-serif;
}

/* blocs */
h2 {
  margin-top: 20px;
  color: #334155;
}

/* input nom */
input[type="text"] {
  padding: 10px;
  border-radius: 8px;
  border: 2px solid #ccc;
  width: 250px;
  margin-top: 5px;
}

/* select pokemon */
select {
  display: block;
  margin: 8px 0;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid #ccc;
  width: 200px;
  cursor: pointer;
}

/* boutons */
button {
  margin: 10px 5px 0 0;
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

/* bouton start */
button:first-of-type {
  background-color: #22c55e;
  color: white;
}

button:first-of-type:hover {
  background-color: #16a34a;
}

/* bouton reset */
button:last-of-type {
  background-color: #ef4444;
  color: white;
}

button:last-of-type:hover {
  background-color: #dc2626;
}

/* erreurs */
ul {
  margin-top: 10px;
  padding: 10px;
  background: #fee2e2;
  border-radius: 8px;
  color: #b91c1c;
}

/* layout plus propre */
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
</style>
