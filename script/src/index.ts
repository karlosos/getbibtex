import urlMetadata from 'url-metadata'
import {parseDomain, ParseResultType} from "parse-domain";

const preUrl = 'http://localhost:8080/'

// const url: string = 'https://www.dzialowski.eu/great-depression-roth/'
const url = preUrl + 'https://www.theguardian.com/us-news/2021/jul/13/joe-biden-republicans-voting-rights-philadelphia'

interface EntryData {
    title: string,
    author: string,
    url: string,
    website: string,
}

function firstWordFromTitle(title: string): string {
    let words = title.split(" ")
    for (const i in title.split(" ")) {
        if (words[i].length > 4) {
            return words[i] 
        }
    }
    return ""
}

function createCiteKey(entryData: EntryData): string {
    let citekey: string = ""
    const parseResult = parseDomain(entryData.website)
    if (parseResult.type === ParseResultType.Listed) {
        const {subDomains, domain, topLevelDomains} = parseResult
        citekey = "" + domain
    }
    citekey = citekey + firstWordFromTitle(entryData.title)
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


urlMetadata(url).then(
   metadata => { // success handler
    console.log(metadata)
    const entryData: EntryData = {
        title: metadata.title,
        author: metadata.author,
        url: metadata.url,
        website: metadata.source,
    }
    return entryData
  },
  error => {
      console.log('Error!')
      console.log(error)
    const emptyEntryData: EntryData = {
        title: '',
        author: '',
        url: '',
        website: '',
    }
    return emptyEntryData
  }
).then(
    entryData => {
        let bibtex: string = bibtexFromEntryData(entryData)
        console.log(bibtex)
    }
)
