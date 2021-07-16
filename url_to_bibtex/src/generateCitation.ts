import urlMetadata from 'url-metadata'
import {parseDomain, ParseResultType} from "parse-domain";
import { Dispatch, SetStateAction } from 'react'

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
        const {subDomains, domain, topLevelDomains} = parseResult
        citekey = "" + domain
    }
    citekey = citekey + firstWordsFromTitle(entryData.title)
    citekey = citekey.replace(/\W/g, '') // remove non-alphanumeric characters
    return citekey
}

function bibtexFromEntryData(entryData: EntryData): string {
    // TODO: check if there are no invalid characters for bibtex
    let bibtex: string = `@misc{${createCiteKey(entryData)},
\tauthor = "${entryData.author}",
\ttitle = "{${entryData.title}} --- ${entryData.website}",
\thowpublished = "\\url{${entryData.url}}",
\tyear = {},
\tnote = {(Accessed on 14.07.2021)},
}`
    return bibtex
}


const getCitation = async (url: string, setBibtexEntry: Dispatch<SetStateAction<string>>) => {
    const proxyUrl = 'http://localhost:8080/'+url
    urlMetadata(proxyUrl).then(
    metadata => { // success handler
        const entryData: EntryData = {
            title: metadata.title,
            author: metadata.author,
            url: url,
            website: metadata.source,
        }
        return entryData
    },
    ).then(
        entryData => {
            let bibtex: string = bibtexFromEntryData(entryData)
            setBibtexEntry(bibtex)
        }
    )
}

export { getCitation }