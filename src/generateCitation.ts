import urlMetadata from 'url-metadata'
import {parseDomain, ParseResultType} from "parse-domain";
import moment from 'moment'

interface EntryData {
    title: string,
    author: string,
    url: string,
    website: string,
}

function firstWordsFromTitle(title: string): string {
    let words = title.split(" ")
    let firstWords = ""
    let numWords = 0
    for (const i in title.split(" ")) {
        if (words[i].length >= 4 && numWords < 2) {
            firstWords = firstWords + words[i].charAt(0).toUpperCase() + words[i].slice(1) // capitalize first letter in word
            numWords += 1
        }
    }
    return firstWords
}

function createCiteKey(entryData: EntryData): string {
    let citekey: string = ""
    const parseResult = parseDomain(entryData.website)
    if (parseResult.type === ParseResultType.Listed) {  // this fails. Why?
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


const getCitation = async (url: string) => {
    const proxyServerUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080/'
    const proxyUrl = proxyServerUrl+url
    return urlMetadata(proxyUrl).then(
    metadata => { // success handler
        const domain = domainFromUrl(url)
        const entryData: EntryData = {
            title: metadata.title,
            author: metadata.author,
            url: url,
            website: domain,
        }
        return entryData
    },
    ).then(
        entryData => {
            let bibtex: string = bibtexFromEntryData(entryData)
            return bibtex
        }
    )
}

export { getCitation }