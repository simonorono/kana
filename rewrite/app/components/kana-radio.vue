<script setup lang="ts">
const { value, checked } = defineProps<{
  value: Kana
  checked: boolean
}>()

const emit = defineEmits(["change"])

const id = `${value}-radio`

function onInputChanged() {
  emit("change", value)
}
</script>

<template>
  <label
    :for="id"
    :class="
      [
        'border-2 border-green-700 px-4 py-1 font-medium text-black',
        checked ? 'bg-green-700 text-white' : false,
      ]
        .filter(Boolean)
        .join('')
    "
  >
    <input
      :id="id"
      class="hidden"
      :checked="checked"
      name="kana"
      type="radio"
      :value="value"
      @change="onInputChanged"
    />
    {{ value }}
  </label>
</template>
