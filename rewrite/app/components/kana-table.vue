<script setup lang="ts">
let kana = ref(Kana.HIRAGANA)
</script>

<template>
  <kana-selector :value="kana" @change="v => (kana = v)" />
</template>
