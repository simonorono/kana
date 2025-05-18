import { useId } from "preact/hooks"

interface Props {
  checked: boolean
  label: string
  name: string
  onChange: (InputEvent) => void
  value: string
}

export default function Radio(props: Props) {
  const { checked, label, name, onChange, value } = props

  const id = useId()

  return (
    <label
      className={[
        "border-2 border-green-700 px-4 py-1 font-medium text-black",
        checked ? "bg-green-700 text-white" : false,
      ]
        .filter(Boolean)
        .join(" ")}
      htmlFor={id}
    >
      <input
        checked={checked}
        className="hidden"
        id={id}
        name={name}
        type="radio"
        value={value}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  )
}
