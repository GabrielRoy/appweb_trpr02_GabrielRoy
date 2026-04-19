<script setup lang="ts">
import type { Pokemon } from '../types/pokemon'
import type { GameInformation } from '../types/gameInformation'
import jsonData from "../backend/db.default.json";
import { ref } from 'vue';
import router from '../router';

const pokemons = jsonData.pokemons;
const errorMessages = ref<string[]>([]);

const pokemonTeam = ref<(Pokemon | null)[]>(Array(5).fill(null));
const trainerName = ref("");

const gameInformation: GameInformation = {
    trainerName: "",
    pokemonTeam: [null, null, null, null, null] as (Pokemon | null)[],
    score: 0
}

function resetInformation() {
    trainerName.value = "";
    pokemonTeam.value = Array(5).fill(null);
}

function changeTeam(pokemons: Pokemon[]) {
    gameInformation.pokemonTeam = pokemons;
}

function changeTrainerName(name: string) {
    gameInformation.trainerName = name;
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
    if (!validateInformation()) {
        return;
    }

    changeTrainerName(trainerName.value);
    changeTeam(pokemonTeam.value as Pokemon[]);
    router.push('/game');
}
</script>
<template>
    <div>
        <h1>Bienvenue dans le jeu de combat de Pokémon !</h1>
        <p>Dans ce jeu, vous incarnez un dresseur de Pokémon et vous devez constituer une équipe de 5 Pokémon pour affronter d'autres dresseurs.</p>
        <p>Pour commencer, veuillez entrer votre nom de dresseur et sélectionner vos Pokémon préférés pour constituer votre équipe.</p>
        <p>Une fois que vous avez constitué votre équipe, vous pouvez affronter d'autres dresseurs et essayer de devenir le meilleur dresseur de Pokémon !</p>
    </div>

    <div>
        <h2>Trainer name</h2>
        <input type="text" v-model="trainerName" placeholder="Enter your trainer name" />
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
            <li v-for="(errorMessage, index) in errorMessages" :key="index">{{ errorMessage }}</li>
        </ul>
    </div>

</template>