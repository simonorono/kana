import Preact from "preact"

interface Props {
  children: Preact.JSX.Element | string
}

export default function Subtitle({ children }: Props) {
  return <h2 class="mb-4 text-3xl font-bold">{children}</h2>
}
