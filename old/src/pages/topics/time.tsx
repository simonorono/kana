import Wordlist from "../../components/wordlist.tsx"
import Subtitle from "../../components/subtitle.tsx"

import { csvToWord } from "../../utils"

import weekdaysCsv from "../../data/time/weekdays.csv?raw"
import monthsCsv from "../../data/time/months.csv?raw"

export default function Time() {
  const months = csvToWord(monthsCsv)
  const weekdays = csvToWord(weekdaysCsv)

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
