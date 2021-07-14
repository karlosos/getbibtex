import urlMetadata from 'url-metadata'

const url: string = 'https://www.dzialowski.eu/great-depression-roth/'

interface EntryData {
    title: string,
    author: string,
    url: string,
    website: string,
}

urlMetadata(url).then(
   metadata => { // success handler
    const entryData: EntryData = {
        title: metadata.title,
        author: metadata.author,
        url: metadata.url,
        website: metadata.source,
    }
    console.log(entryData)
  },
  error => { // failure handler
    console.log(error)
  }
)
