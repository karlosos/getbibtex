import './App.css'
import { GeistProvider, CssBaseline, useClipboard } from '@geist-ui/react'
import { Row, Col, Input, Spacer, Button, Textarea, Text, Note } from '@geist-ui/react'
import { useEffect, useState } from 'react'
import { getCitation } from './generateCitation'
import { Copy, Check } from '@geist-ui/react-icons'
import moment from 'moment'

const App = () => {
  const [url, setUrl] = useState('')
  const [bibtexEntry, setBibtexEntry] = useState('')
  const [entryData, setEntryData] = useState()
  const { copy } = useClipboard()
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const handleButtonClicked = (e) => {
    setLoading(true)
    getCitation(url, setBibtexEntry).then(({bibtex, entryData})=> {
      setBibtexEntry(bibtex)
      setEntryData(entryData)
      setLoading(false)  // will this work on error promise?
    })
  }

  const handleCopyClicked = () => {
    copy(bibtexEntry)
    // set checkmark in button
    setCopied(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <GeistProvider>
      <CssBaseline />
        <Row style={{ marginBottom: '15px'}} justify="center">
          <Col span={22} justify="center" style={{maxWidth: '38em'}}>
            <Spacer y={2}/>
            <Text h1>BibTex generator from URL</Text>
            <Note label="IMPORTANT NOTE" type="warning">Most educators and professionals do not consider it appropriate to use tertiary sources such as encyclopedias as a sole source for any information—citing an encyclopedia as an important reference in footnotes or bibliographies may result in censure or a failing grade. Wikipedia articles should be used for background information, as a reference for correct terminology and search terms, and as a starting point for further research.</Note>
            <Spacer y={2} />
            <Text h4>Enter the URL below: </Text>
            <Input placeholder="URL to website/article" width="100%" value={url} onChange={handleUrlChange} />
            <Spacer y={.5} />
            <Row justify="center">
              <Button loading={loading} onClick={handleButtonClicked} type="secondary" style={{width: '100%'}}>Generate BibTex entry</Button>
            </Row>
            <Spacer y={.5} />
            <div className='output' style={{position: 'relative'}}>
            <Textarea placeholder="" width="100%" minHeight="23em" value={bibtexEntry} onChange={(e) => setBibtexEntry(e.target.value)}/>
            <Button style={{position: 'absolute', top: '5px', right: '5px', zIndex: 33, borderColor: copied ? 'green' : '', padding: '0 0.5rem'}} iconRight={copied ? <Check color='green' /> : <Copy /> } auto size="small" onClick={handleCopyClicked}></Button>
            </div>
            {entryData!=null && 
              <span>
                <span>{entryData?.author && entryData?.author + '. '}</span>
                <span style={{fontStyle: 'italic'}}>{entryData?.title + ' --- ' + entryData?.website + '. '} </span>
                <a href={entryData?.url}>{entryData?.url}</a>,
                <span> {entryData?.date && entryData?.date + '. '}</span>
                <span>[Accessed {moment().format("DD-MMM-YYYY")}]</span>
              </span>
            }
          </Col>
        </Row>
    </GeistProvider>
  )
}

export default App
