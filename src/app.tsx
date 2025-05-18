import { dakuon, SEION } from "./data.ts"
import { useState } from "preact/hooks"
import Radio from "./components/radio.tsx"
import Table from "./components/table.tsx"

import "./index.css"

const HIRAGANA = "hiragana"
const KATAKANA = "katakana"

export function App() {
  const [kana, setKana] = useState(HIRAGANA)

  const onChange = (ev: Event) => {
    const target = ev.target as HTMLInputElement
    setKana(target.value)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6">
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
  )
}
