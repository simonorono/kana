import Wordlist from "../../components/wordlist.tsx"
import Subtitle from "../../components/subtitle.tsx"

import weekdays from "../../data/time/weekdays.json"
import months from "../../data/time/months.json"

export default function Time() {
  return (
    <div class="space-y-8 text-2xl">
      <div>
        <Subtitle>Days of the week</Subtitle>

        <Wordlist list={weekdays} />
      </div>

      <div class="space-y-4">
        <Subtitle>Months</Subtitle>

        <p>
          For months, just use number of the month followed by the suffix 月.
        </p>

        <Wordlist list={months} />
      </div>
    </div>
  )
}
