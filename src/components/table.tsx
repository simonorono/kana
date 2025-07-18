interface Props {
  className?: string
  entries: any
  kana: string
}

const CELL_CLASSES = "w-[2em] text-center text-4xl p-2 border border-gray-400"

export default function Table(props: Props) {
  const { className, entries, kana } = props

  return (
    <div className={className}>
      <table className="mx-auto">
        <thead>
          <tr>
            <th className={`${CELL_CLASSES}`}></th>
            <th className={`${CELL_CLASSES}`}>a</th>
            <th className={`${CELL_CLASSES}`}>i</th>
            <th className={`${CELL_CLASSES}`}>u</th>
            <th className={`${CELL_CLASSES}`}>e</th>
            <th className={`${CELL_CLASSES}`}>o</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(entries).map(([key, value]) => (
            <tr className={key}>
              <th className={`${CELL_CLASSES}`}>{key}</th>
              {Object.entries(value).map(([key, value]) => (
                <td key={key} className={`${CELL_CLASSES} font-japanese`}>
                  {value[kana] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
