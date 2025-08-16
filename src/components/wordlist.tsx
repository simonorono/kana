import Preact from "preact"
import { isKanji, toKana } from "../utils"

interface Props {
  list: Word[]
}

interface JpProps {
  word: Word
}

interface WordProps {
  jp: string | Preact.JSX.Element
  kana: string
  en: string
}

function Jp(props: JpProps) {
  const { word } = props

  let kanjiIndex = 0

  return (
    <>
      {word.jp.split("").map(c => {
        const hasFurigana = !!word.furigana[kanjiIndex]

        if (isKanji(c) && hasFurigana) {
          return (
            <ruby>
              {c}
              <rt>{word.furigana[kanjiIndex++]}</rt>
            </ruby>
          )
        }

        return <ruby>{c}</ruby>
      })}
    </>
  )
}

export function Word({ jp, en, kana }: WordProps) {
  return (
    <div class="flex">
      {[jp, en, kana].map(str => (
        <p class="font-japanese flex w-1/3 items-center justify-center border p-2">
          {str}
        </p>
      ))}
    </div>
  )
}

export default function Wordlist(props: Props) {
  const { list } = props

  return (
    <div>
      <ul class="border">
        <li class="font-medium">
          {<Word jp="Japanese" en="English" kana="Kana" />}
        </li>
        {list.map(word => (
          <li>
            <Word jp={<Jp word={word} />} en={word.en} kana={toKana(word)} />
          </li>
        ))}
      </ul>
    </div>
  )
}
