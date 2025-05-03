import KANA from "./data.ts";
import {useState} from "react";

const HIRAGANA = 'hiragana';
const KATAKANA = 'katakana';

export function App() {
    const [kana, setKana] = useState(HIRAGANA)

    const onChange = (ev: Event) => {
        const target = ev.target as HTMLInputElement
        setKana(target.value)
    }

    return (
        <div>
            <select onChange={onChange}>
                {[HIRAGANA, KATAKANA].map(opt => (
                    <option
                        key={opt}
                        value={opt}
                        selected={opt === kana}
                    >
                        {opt}
                    </option>
                ))}
            </select>

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
                        <td>{value.a[kana]}</td>
                        <td>{value.i[kana]}</td>
                        <td>{value.u[kana]}</td>
                        <td>{value.e[kana]}</td>
                        <td>{value.o[kana]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
