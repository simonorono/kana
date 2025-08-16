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
