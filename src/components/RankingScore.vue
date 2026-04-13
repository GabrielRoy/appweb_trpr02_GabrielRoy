<script setup lang="ts">
import type { Ranking } from '../types/ranking'

const props = defineProps<{
    place: number;
    ranking: Ranking;
}>();
</script>
<template>
    <div>
        <p>{{ place }}. {{ ranking.id }} {{ ranking.name }} : {{ ranking.score }}P$</p>
    </div>
</template>