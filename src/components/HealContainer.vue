<script setup lang="ts">
defineProps<{
  player: any;
  hpPercentAskToHeal: number;
  healActivePokemon: (percent: number) => void;
  currentTrainer: any;
  currentBattle: number;
  totalBattles: number;
}>();

const emit = defineEmits(["update:hpPercentAskToHeal"]);
</script>
<template>
  <div
    class="card"
    v-if="
      currentTrainer &&
      currentTrainer.pokemon.hp <= 0 &&
      currentBattle < totalBattles
    "
  >
    <input
      type="number"
      :value="hpPercentAskToHeal"
      @input="
        emit(
          'update:hpPercentAskToHeal',
          Number(($event.target as HTMLInputElement).value),
        )
      "
      min="0"
      :max="player.activePokemon.hp"
    />

    <button @click="healActivePokemon(hpPercentAskToHeal)">
      💊 Soigner Pokémon Actif
    </button>
  </div>
</template>
