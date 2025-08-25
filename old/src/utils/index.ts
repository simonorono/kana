const KANJI_REGEX = new RegExp("[\u4e00-\u9faf]|[\u3400-\u4dbf]")

export function isKanji(character: string): boolean {
  if (character.length !== 1) {
    throw new Error("not a single character")
  }

  const match = character.match(KANJI_REGEX)

  return match && match.length === 1
}

export function toKana(word: Word): string {
  let kanjiIndex = 0

  return word.jp
    .split("")
    .map(c => (isKanji(c) ? word.furigana[kanjiIndex++] : c))
    .join("")
}

export function csvToWord(csvText: string): Word[] {
  let lines = csvText.split(/\r?\n/)

  return lines.map(line => {
    const parts = line.trim().split(",")

    return {
      jp: parts[0].trim(),
      en: parts[1].trim(),
      furigana: parts[2].split("|").map(_ => _.trim()),
    }
  })
}
