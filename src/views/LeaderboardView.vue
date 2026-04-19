<script setup lang="ts">
import type { Ranking } from '../types/ranking'
import RankingScore from '../components/RankingScore.vue';
import { computed } from 'vue';
import jsonData from "../backend/db.default.json";

const ranking = jsonData.ranking;


const props = defineProps<{
    rankings: Ranking[];
}>();


const sortedRankings = computed(() => ranking.sort((a, b) => b.score - a.score));

//const sortedRankings = computed(() => [...props.rankings].sort((a, b) => b.score - a.score));

</script>

<template>
    <ul>
        <li v-for="(value, index) in sortedRankings" :key="value.id">
            <RankingScore :ranking="value" :place="index + 1"/>
        </li>
    </ul>
</template>
