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

        return (
          <ruby>
            {c}
            {isKanji(c) && hasFurigana && (
              <rt>{word.furigana[kanjiIndex++]}</rt>
            )}
          </ruby>
        )
      })}
    </>
  )
}

export function Word({ jp, en, kana }: WordProps) {
  return (
    <div class="flex">
      {[jp, en, kana].map(str => (
        <p class="font-japanese w-1/3 border p-2 text-center">{str}</p>
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
