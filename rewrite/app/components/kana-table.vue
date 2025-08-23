<script setup lang="ts">
const CELL_CLASSES = "w-[2em] text-center text-4xl p-2 border border-gray-400"

const { entries, kana } = defineProps<{
  entries: Seion
  kana: Kana
}>()
</script>

<template>
  <div class="grow">
    <table class="mx-auto">
      <thead>
        <tr>
          <th :class="CELL_CLASSES"></th>
          <th :class="CELL_CLASSES">a</th>
          <th :class="CELL_CLASSES">i</th>
          <th :class="CELL_CLASSES">u</th>
          <th :class="CELL_CLASSES">e</th>
          <th :class="CELL_CLASSES">o</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[key, values] in Object.entries(entries)" :key="key">
          <th :class="CELL_CLASSES">{{ key }}</th>
          <td
            v-for="[key, value] in Object.entries(values)"
            :key="key"
            :class="CELL_CLASSES"
          >
            {{ value[kana] ?? "--" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
