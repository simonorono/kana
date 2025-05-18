import KANA from "./data.ts"
import { useState } from "react"

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
    <div>
      <div>
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

      <table>
        <thead>
          <tr>
            <th></th>
            <th>a</th>
            <th>i</th>
            <th>u</th>
            <th>e</th>
            <th>o</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(KANA).map(([key, value]) => (
            <tr>
              <th>{key}</th>
              {["a", "i", "u", "e", "o"].map(k => (
                <td>{value[k][kana]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
