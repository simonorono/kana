export enum Kana {
  HIRAGANA = "hiragana",
  KATAKANA = "katakana",
}

interface SeionValue {
  hiragana: string | null
  katakana: string | null
}

type SeionEntry = { [_: string]: SeionValue }

export const SEION: { [_: string]: SeionEntry } = {
  a: {
    a: { hiragana: "あ", katakana: "ア" },
    i: { hiragana: "い", katakana: "イ" },
    u: { hiragana: "う", katakana: "ウ" },
    e: { hiragana: "え", katakana: "エ" },
    o: { hiragana: "お", katakana: "オ" },
  },
  k: {
    a: { hiragana: "か", katakana: "カ" },
    i: { hiragana: "き", katakana: "キ" },
    u: { hiragana: "く", katakana: "ク" },
    e: { hiragana: "け", katakana: "ケ" },
    o: { hiragana: "こ", katakana: "コ" },
  },
  s: {
    a: { hiragana: "さ", katakana: "サ" },
    i: { hiragana: "し", katakana: "シ" },
    u: { hiragana: "す", katakana: "ス" },
    e: { hiragana: "せ", katakana: "セ" },
    o: { hiragana: "そ", katakana: "ソ" },
  },
  t: {
    a: { hiragana: "た", katakana: "タ" },
    i: { hiragana: "ち", katakana: "チ" },
    u: { hiragana: "つ", katakana: "ツ" },
    e: { hiragana: "て", katakana: "テ" },
    o: { hiragana: "と", katakana: "ト" },
  },
  n: {
    a: { hiragana: "な", katakana: "ナ" },
    i: { hiragana: "に", katakana: "ニ" },
    u: { hiragana: "ぬ", katakana: "ヌ" },
    e: { hiragana: "ね", katakana: "ネ" },
    o: { hiragana: "の", katakana: "ノ" },
  },
  h: {
    a: { hiragana: "は", katakana: "ハ" },
    i: { hiragana: "ひ", katakana: "ヒ" },
    u: { hiragana: "ふ", katakana: "フ" },
    e: { hiragana: "へ", katakana: "ヘ" },
    o: { hiragana: "ほ", katakana: "ホ" },
  },
  m: {
    a: { hiragana: "ま", katakana: "マ" },
    i: { hiragana: "み", katakana: "ミ" },
    u: { hiragana: "む", katakana: "ム" },
    e: { hiragana: "め", katakana: "メ" },
    o: { hiragana: "も", katakana: "モ" },
  },
  y: {
    a: { hiragana: "や", katakana: "ヤ" },
    i: { hiragana: null, katakana: null },
    u: { hiragana: "ゆ", katakana: "ユ" },
    e: { hiragana: null, katakana: null },
    o: { hiragana: "よ", katakana: "ヨ" },
  },
  r: {
    a: { hiragana: "ら", katakana: "ラ" },
    i: { hiragana: "り", katakana: "リ" },
    u: { hiragana: "る", katakana: "ル" },
    e: { hiragana: "れ", katakana: "レ" },
    o: { hiragana: "ろ", katakana: "ロ" },
  },
  w: {
    a: { hiragana: "わ", katakana: "ワ" },
    i: { hiragana: null, katakana: null },
    u: { hiragana: null, katakana: null },
    e: { hiragana: null, katakana: null },
    o: { hiragana: "を", katakana: "ヲ" },
  },
  _n: {
    n: { hiragana: "ん", katakana: "ン" },
  },
}

const DAKUTEN_MAP = {
  k: "g",
  s: "z",
  t: "d",
  h: "b",
}

const HANDAKUTEN_MAP = {
  h: "p",
}

const DAKUTEN = "\u3099"
const HANDAKUTEN = "\u309A"

function transformToDakuon(entry: SeionEntry, glyph: string): SeionEntry {
  let copy = structuredClone(entry)

  for (let key in copy) {
    const value = copy[key] as SeionValue

    value.hiragana += glyph
    value.katakana += glyph
  }

  return copy
}

export function dakuon() {
  let map: { [_: string]: SeionEntry } = {}

  for (let [seion, char] of Object.entries(DAKUTEN_MAP)) {
    map[char] = transformToDakuon(SEION[seion] as SeionEntry, DAKUTEN)
  }

  for (let [seion, char] of Object.entries(HANDAKUTEN_MAP)) {
    map[char] = transformToDakuon(SEION[seion] as SeionEntry, HANDAKUTEN)
  }

  return map
}
