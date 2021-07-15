import './App.css'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { Row, Col, Input, Spacer, Button, Textarea } from '@geist-ui/react'
import { useState } from 'react'
import { getCitation } from './generateCitation'

const App = () => {
  const [url, setUrl] = useState('')
  const [bibtexEntry, setBibtexEntry] = useState('')

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const handleButtonClicked = (e) => {
    getCitation(url, setBibtexEntry)
  }

  return (
    <GeistProvider>
      <CssBaseline />
        <Spacer y={1}/>
        <Row style={{ marginBottom: '15px' }} justify="center">
          <Col span={12} justify="center">
            <Input placeholder="URL to website/article" width="100%" value={url} onChange={handleUrlChange} />
             <Spacer y={.5} />
            <Button onClick={handleButtonClicked}>Generate BibTex entry</Button>
             <Spacer y={.5} />
            <Textarea placeholder="" width="100%" value={bibtexEntry} />
          </Col>
        </Row>
    </GeistProvider>
  )
}

export default App
