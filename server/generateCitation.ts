import urlMetadata from 'url-metadata'
import { parseDomain, ParseResultType } from "parse-domain";
import moment from 'moment'
import { EntryData } from '../common/types';

function firstWordsFromTitle(title: string): string {
    let words = title.split(" ")
    let firstWords = ""
    let numWords = 0

    console.log('>> title', title);
    console.log('>> words', words);

    for (const word of words) {
        console.log("i", word)
        // Why we are checking words[i] here? To Be analyzed.
        if (word.length >= 4 && numWords < 2) {
            firstWords = firstWords + word.charAt(0).toUpperCase() + word.slice(1) // capitalize first letter in word
            numWords += 1
        }
    }

    return firstWords
}

function createCiteKey(entryData: EntryData): string {
    let citekey: string = ""
    const parseResult = parseDomain(entryData.website)
    if (parseResult.type === ParseResultType.Listed) {
        const { domain } = parseResult
        citekey = "" + domain
    }
    citekey = citekey + firstWordsFromTitle(entryData.title)
    citekey = citekey.replace(/\W/g, '') // remove non-alphanumeric characters

    return citekey
}

function bibtexFromEntryData(entryData: EntryData): string {
    // TODO: check if there are no invalid characters for bibtex
    const currentDate = moment().format("DD-MMM-YYYY")
    const title = upperLettersInBibTex(`${entryData.title} --- ${entryData.website}`)
    let bibtex: string = `@misc{${createCiteKey(entryData)},
\tauthor = {${entryData.author}},
\ttitle = {${title}},
\thowpublished = {\\url{${entryData.url}}},
\tyear = {},
\tnote = {[Accessed ${currentDate}]},
}`

    return bibtex
}

function upperLettersInBibTex(str: string): string {
    return str.replace(/([A-Z])/g, '{$1}')
}

function domainFromUrl(url: string): string {
    // based on regular expression https://regex101.com/r/MOIFTy/3
    const domainRegex = /^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/
    const match = url.match(domainRegex)
    let domain: string = ''
    if (match != null) {
        domain = match[1]
    }
    return domain
}


export const getCitation = async (url: string) => {
    const metadata = await urlMetadata(url);
    const domain = domainFromUrl(url)
    const entryData: EntryData = {
        title: metadata.title,
        author: metadata.author,
        url: url,
        website: domain,
    }

    const bibtex: string = bibtexFromEntryData(entryData)

    return {bibtex, entryData}
}
