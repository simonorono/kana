import { useState } from "preact/hooks"
import { HIRAGANA, KATAKANA, dakuon, SEION } from "../data.ts"
import Radio from "../components/radio.tsx"
import Table from "../components/table.tsx"

export default function Index() {
  const [kana, setKana] = useState(HIRAGANA)

  const onChange = (ev: Event) => {
    const target = ev.target as HTMLInputElement
    setKana(target.value)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full flex-row items-center justify-between p-2 text-xl shadow shadow-green-700">
        <p className="font-japanese text-4xl font-bold">仮名</p>
        <a className="block text-blue-800 underline" href="/game">
          Game
        </a>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex flex-row items-center justify-center space-x-2">
          {[HIRAGANA, KATAKANA].map(v => (
            <Radio
              checked={v === kana}
              key={v}
              label={v}
              name="kana"
              onChange={onChange}
              value={v}
            />
          ))}
        </div>

        <div className="inline-flex flex-row flex-wrap items-baseline space-y-4 min-[685px]:space-x-2">
          <Table className="grow" entries={SEION} kana={kana} />
          <Table className="grow" entries={dakuon()} kana={kana} />
        </div>
      </div>

      <div className="text-center">
        <p>Made with ❤️ in Maracaibo, Venezuela</p>
        <a className="text-blue-800 underline" href="https://simonorono.com">
          by Simón Oroño
        </a>
        <div className="h-10" />
      </div>
    </div>
  )
}
