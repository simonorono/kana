<script setup lang="ts">
import { ArrowPathIcon } from "@heroicons/vue/24/solid"
import { getSeionValue } from "~/utils/kana"

type Option = [string, string]

const MAX_CACHED_SECRETS = 20

function getRandomNumber(max: number) {
  const buffer = new Uint16Array(1)
  crypto.getRandomValues(buffer)
  return (buffer[0] as number) % max
}

function shuffle<T>(array: T[]): T[] {
  let newArray = [...array]

  for (let i = newArray.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1))

    const temp = newArray[j]

    newArray[j] = newArray[i] as T

    newArray[i] = temp as T
  }

  return newArray
}

function optionToRomaji(opt: Array<string>): string {
  if (["a", "_n"].includes(opt[0] as string)) {
    return opt[1] as string
  }

  const EXCEPTIONS = {
    chi: ["t", "i"],
    tsu: ["t", "u"],
    shi: ["s", "i"],
    fu: ["h", "u"],
  }

  for (let [romaji, pair] of Object.entries(EXCEPTIONS)) {
    if (opt[0] === pair[0] && opt[1] === pair[1]) {
      return romaji
    }
  }

  return opt.join("")
}

let secretCache = [] as Option[]
const options = ref([] as Option[])
const guessType = ref(false)

const guess = ref(null as Option | null)
const secret = ref(null as Option | null)

const guessing = computed(() =>
  guessType.value ? Kana.HIRAGANA : Kana.KATAKANA
)
const selecting = computed(() =>
  !guessType.value ? Kana.HIRAGANA : Kana.KATAKANA
)

function getRandomOption(): Option {
  while (true) {
    const entries = Object.entries(SEION)
    const rowIndex = getRandomNumber(entries.length)
    const row = entries[rowIndex] as [string, SeionEntry]

    const columns = Object.entries(row[1])
    const columnIndex = getRandomNumber(columns.length)
    const column = columns[columnIndex] as [string, SeionValue]

    if (column[1].hiragana === null) {
      continue
    }

    return [row[0], column[0]]
  }
}

function exists(options: Option[], test: Option): boolean {
  for (let option of options) {
    if (option[0] === test[0] && option[1] === test[1]) {
      return true
    }
  }

  return false
}

function addOption(options: Option[]) {
  const newOption = getRandomOption()

  if (exists(options, newOption)) {
    // kana already there, return options unmodified
    return options
  }

  return [newOption, ...options]
}

function setup() {
  guess.value = null
  options.value = []

  const newSecret = getRandomOption()

  if (exists(secretCache, newSecret)) {
    // cache hit, re-run setup
    setTimeout(setup, 0)
    return
  }

  secretCache = [newSecret, ...secretCache].slice(0, MAX_CACHED_SECRETS)
  secret.value = newSecret

  let newOptions = [newSecret]

  while (newOptions.length < 5) {
    newOptions = addOption(newOptions)
  }

  options.value = shuffle(newOptions)
  guessType.value = !guessType.value
}

function newGame() {
  if (!guess.value) {
    return
  }

  setup()
}

function getKanaForOption(option: Option, type: Kana): string {
  return getSeionValue(option[0], option[1])[type] as string
}

const isSecret = (option: Option) =>
  secret.value && option[0] === secret.value[0] && option[1] === secret.value[1]

const isSelected = (option: Option) =>
  guess.value && option[0] === guess.value[0] && option[1] === guess.value[1]

const isCorrectGuess = (option: Option) =>
  isSecret(option) && isSelected(option)

setup()
</script>

<template>
  <div
    v-if="secret"
    class="mx-auto flex h-screen max-w-md flex-col items-center justify-center select-none"
  >
    <div
      class="relative flex h-6/8 w-full flex-col items-center justify-center"
      @click="newGame"
    >
      <p class="mt-4 font-medium">Guess the correct option</p>
      <NuxtLink href="/" class="text-blue-800 underline">
        ← Back to index
      </NuxtLink>

      <div class="flex grow items-center justify-center">
        <p class="text-9xl">{{ getKanaForOption(secret, guessing) }}</p>
      </div>

      <p
        v-if="guess"
        class="absolute right-4 bottom-4 flex flex-row items-center space-x-2"
      >
        <ArrowPathIcon className="size-8" />
        <span>New guess</span>
      </p>
    </div>

    <div class="h-2/8 w-full p-4">
      <div class="flex justify-between">
        <div
          v-for="opt in options"
          :class="
            [
              'relative flex cursor-pointer flex-col border-2 p-4 text-center text-2xl',
              isCorrectGuess(opt) || (guess && isSecret(opt))
                ? 'border-green-600 bg-green-600 text-white'
                : false,
              isSelected(opt) && !isCorrectGuess(opt)
                ? 'border-red-600 bg-red-600 text-white'
                : false,
            ]
              .filter(Boolean)
              .join(' ')
          "
          @click="() => !guess && (guess = opt)"
        >
          <span>{{ getKanaForOption(opt, selecting) }}</span>
          <small v-if="guess" class="absolute bottom-0 left-1 text-xs">
            {{ optionToRomaji(opt) }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>
