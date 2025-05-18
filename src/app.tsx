import { dakuon, SEION } from "./data.ts"
import { useState } from "preact/hooks"
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
    <div className="p-6">
      <div className="flex flex-col">
        {[HIRAGANA, KATAKANA].map(v => (
          <label key={v}>
            <input
              checked={v === kana}
              name="kana"
              onChange={onChange}
              type="radio"
              value={v}
            />
            <span>{v}</span>
          </label>
        ))}
      </div>

      <div className="flex flex-row items-baseline space-x-4">
        <Table entries={SEION} kana={kana} />
        <Table entries={dakuon()} kana={kana} />
      </div>
    </div>
  )
}
