export enum Kana {
  HIRAGANA = "hiragana",
  KATAKANA = "katakana",
}

export interface SeionValue {
  hiragana: string | null
  katakana: string | null
}

export type SeionEntry = { [_: string]: SeionValue }

export type Seion = { [_: string]: SeionEntry }
