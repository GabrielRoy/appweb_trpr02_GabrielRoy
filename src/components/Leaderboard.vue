<script setup lang="ts">
import type { Ranking } from '../types/ranking'
import RankingScore from './RankingScore.vue';

const props = defineProps<{
    rankings: Ranking[];
}>();

props.rankings.sort((a, b) => b.score - a.score);

</script>

<template>
    <ul>
        <li v-for="(value, index) in rankings" :key="value.id">
            <RankingScore :ranking="value" :place="index + 1"/>
        </li>
    </ul>
</template>
