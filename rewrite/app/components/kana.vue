<script setup lang="ts">
let kana = ref(Kana.HIRAGANA)
</script>

<template>
  <div class="flex flex-col items-center space-y-4 p-6">
    <div class="flex flex-row items-center justify-center space-x-2">
      <kana-selector :value="kana" @change="v => (kana = v)" />
    </div>

    <div
      class="inline-flex flex-row flex-wrap items-baseline space-y-4 min-[685px]:space-x-2"
    >
      <kana-table :entries="SEION" :kana="kana" />
      <kana-table :entries="dakuon()" :kana="kana" />
    </div>
  </div>
</template>
