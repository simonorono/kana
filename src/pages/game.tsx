import { useEffect, useState } from "preact/hooks"
import { SEION } from "../data.ts"

const MAX_CACHED_SECRETS = 20

function getRandomNumber() {
  const buffer = new Uint16Array(1)
  crypto.getRandomValues(buffer)
  return buffer[0]
}

export function shuffle<T>(array: T[]): T[] {
  let newArray = array.slice()

  for (let i = newArray.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1))

    const temp = newArray[j]

    newArray[j] = newArray[i]

    newArray[i] = temp
  }

  return newArray
}

export default function Game() {
  const [guess, setGuess] = useState(null)
  const [secret, setSecret] = useState(null)
  const [secretCache, setSecretCache] = useState([])
  const [options, setOptions] = useState([])

  function addOption(options: Array<Array<string>>): Array<Array<string>> {
    const entries = Object.entries(SEION)
    const rowIndex = getRandomNumber() % entries.length

    const columns = Object.entries(entries[rowIndex][1])
    const columnIndex = getRandomNumber() % columns.length

    const newOption = [entries[rowIndex][0], columns[columnIndex][0]]

    // non-existing kana, return unmodified
    if (columns[columnIndex][1].hiragana === null) {
      return options
    }

    for (let option of options) {
      if (option[0] === newOption[0] && option[1] === newOption[1]) {
        // option already there, return unmodified
        return options
      }
    }

    return [newOption, ...options]
  }

  function setup() {
    setGuess(null)
    setOptions([])

    const entries = Object.entries(SEION)
    const rowIndex = getRandomNumber() % entries.length

    const columns = Object.entries(entries[rowIndex][1])
    const columnIndex = getRandomNumber() % columns.length

    // non-existing kana, re-run setup
    if (columns[columnIndex][1].hiragana === null) {
      setTimeout(() => setup(), 0)
      return
    }

    const newSecret = [entries[rowIndex][0], columns[columnIndex][0]]

    for (let entry of secretCache) {
      if (entry[0] === newSecret[0] && entry[1] === newSecret[1]) {
        // cache hit, re-run setup
        setTimeout(() => setup(), 0)
        return
      }
    }

    setSecretCache([newSecret, ...secretCache].slice(0, MAX_CACHED_SECRETS))
    setSecret(newSecret)

    let newOptions = [newSecret]

    while (newOptions.length !== 5) {
      newOptions = addOption(newOptions)
    }

    setOptions(shuffle(newOptions))
  }

  function newGame() {
    if (!guess) {
      return
    }

    setup()
  }

  useEffect(() => {
    setup()
  }, [])

  const isSecret = option =>
    secret && option[0] === secret[0] && option[1] === secret[1]

  const isSelected = option =>
    guess && option[0] === guess[0] && option[1] === guess[1]

  const isCorrectGuess = option => isSecret(option) && isSelected(option)

  return (
    <>
      {secret && (
        <div className="flex h-screen flex-col items-center justify-center select-none">
          <div
            className="flex h-6/8 w-full items-center justify-center"
            onClick={newGame}
          >
            <p className="font-japanese text-9xl">
              {SEION[secret[0]][secret[1]].hiragana}
            </p>
          </div>

          <div className="h-2/8 w-full p-4">
            <div className="flex justify-between">
              {options.map(opt => (
                <div
                  className={[
                    "cursor-pointer border-2 p-4 text-center text-2xl",
                    isCorrectGuess(opt) || (guess && isSecret(opt))
                      ? "border-green-600 bg-green-600 text-white"
                      : false,
                    isSelected(opt) && !isCorrectGuess(opt)
                      ? "border-red-600 bg-red-600 text-white"
                      : false,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => !guess && setGuess(opt)}
                >
                  {SEION[opt[0]][opt[1]].katakana}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
