<script setup lang="ts">
const kana = ref(Kana.HIRAGANA)
</script>

<template>
  <kana-selector :value="kana" @change="k => (kana = k)" />
</template>
