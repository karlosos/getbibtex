import './App.css'
import { GeistProvider, CssBaseline, useClipboard } from '@geist-ui/react'
import { Row, Col, Input, Spacer, Button, Textarea, Text, Note } from '@geist-ui/react'
import { useState } from 'react'
import { getCitation } from './generateCitation'
import { Copy } from '@geist-ui/react-icons'

const App = () => {
  const [url, setUrl] = useState('')
  const [bibtexEntry, setBibtexEntry] = useState('')
  const { copy } = useClipboard()

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const handleButtonClicked = (e) => {
      getCitation(url, setBibtexEntry)
  }

  const handleCopyClicked = () => {
    copy(bibtexEntry)
  }

  return (
    <GeistProvider>
      <CssBaseline />
        <Spacer y={1}/>
        <Row style={{ marginBottom: '15px'}} justify="center">
          <Col span={22} justify="center" style={{maxWidth: '38em'}}>
            <Text h1>BibTex generator from URL</Text>
            <Note label="IMPORTANT NOTE" type="warning">Most educators and professionals do not consider it appropriate to use tertiary sources such as encyclopedias as a sole source for any information—citing an encyclopedia as an important reference in footnotes or bibliographies may result in censure or a failing grade. Wikipedia articles should be used for background information, as a reference for correct terminology and search terms, and as a starting point for further research.</Note>
            <Spacer y={2} />
            <Text h4>Enter the URL below: </Text>
            <Input placeholder="URL to website/article" width="100%" value={url} onChange={handleUrlChange} />
            <Spacer y={.5} />
            <Row justify="center">
              <Button onClick={handleButtonClicked} type="secondary" style={{width: '100%'}}>Generate BibTex entry</Button>
            </Row>
            <Spacer y={.5} />
            <div className='output' style={{position: 'relative'}}>
            <Textarea placeholder="" width="100%" minHeight="23em" value={bibtexEntry} />
            <Button style={{position: 'absolute', top: '5px', right: '5px', zIndex: 33}} iconRight={<Copy />} auto size="small" onClick={handleCopyClicked}></Button>
            </div>
          </Col>
        </Row>
    </GeistProvider>
  )
}

export default App
