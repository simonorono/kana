// Just defining it here to silence a type error on the router
interface Props {
  default: boolean
}

export default function NotFound(_: Props) {
  return (
    <div class="p-8">
      <p class="text-2xl font-bold">404 — Not found</p>
    </div>
  )
}
