<script setup lang="ts">
const { value } = defineProps<{
  value: Kana
}>()

const emit = defineEmits(["change"])

const values: Kana[] = [Kana.HIRAGANA, Kana.KATAKANA]
</script>

<template>
  <div>
    <kana-radio
      v-for="kana in values"
      :value="kana"
      :checked="value === kana"
      @change="emit('change', kana)"
    />
  </div>
</template>
