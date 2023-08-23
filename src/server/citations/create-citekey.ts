import { type EntryData } from "./types"
import { parseDomain, ParseResultType } from "parse-domain";

// This function won't work in the frontend. Maybe pass the parseDomain from the `get-citation-data.ts` into here
export function createCiteKey(entryData: EntryData): string {
    let citekey = ""
    const parseResult = parseDomain(entryData.website)
    if (parseResult.type === ParseResultType.Listed) {
        const { domain } = parseResult
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        citekey = "" + domain
    }
    citekey = citekey + firstWordsFromTitle(entryData.title)
    citekey = citekey.replace(/\W/g, '') // remove non-alphanumeric characters

    return citekey
}

function firstWordsFromTitle(title: string): string {
    const words = title.split(" ")
    let firstWords = ""
    let numWords = 0

    // Get first two words from the title and capitalize first letters
    for (const word of words) {
        if (word.length >= 4 && numWords < 2) {
            firstWords = firstWords + word.charAt(0).toUpperCase() + word.slice(1) // capitalize first letter in word
            numWords += 1
        }
    }

    return firstWords
}
