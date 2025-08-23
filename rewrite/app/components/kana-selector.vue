<script setup lang="ts">
const { value } = defineProps<{
  value: Kana
}>()

const emit = defineEmits(["change"])
</script>

<template>
  <div>
    <kana-radio
      v-for="kana in [Kana.HIRAGANA, Kana.KATAKANA]"
      :value="kana"
      :checked="value === kana"
      @change="emit('change', kana)"
    />
  </div>
</template>
