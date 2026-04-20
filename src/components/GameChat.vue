<script setup lang="ts">
defineProps<{
  chatMessages: string[];
}>();
</script>

<template>
  <div class="chat" v-if="chatMessages.length > 0">
    <div v-for="message in chatMessages" :key="message">
      {{ message }}
    </div>
  </div>
</template>
