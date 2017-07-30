import React, { Component } from 'react'
import {
  Navbar,
  Row,
  Col,
  Grid
} from 'react-bootstrap'

import 'bootstrap-css-only'

import Debug from './components/Debug'
import ResultsPanel from './components/ResultsPanel'
import MappingsForm from './components/MappingsForm'
import JSONGenerator from './lib/JSONGenerator'
import Storage from './lib/FileIOStorage'
import validate, { isMappingStarted, isMappingFinished } from './utils/validateMappings'

const GITHUB_REPO_URL = 'https://github.com/dreyks/karabiner-hyper-run'
const KARABINER_URL = 'https://github.com/tekezo/Karabiner-Elements'
const KARABINER_IMPORT_URL = 'karabiner://karabiner/assets/complex_modifications/import?url='
const EMPTY_MAPPING = { hotkey: '', app: '' }

class App extends Component {
  state = {
    keyMappings: [{ hotkey: '', app: '' }]
  }

  storage = new Storage()

  render() {
    return (
      <div className="App">
        <Navbar inverse={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href={KARABINER_URL} target="_blank" rel="noopener noreferrer">Karabiner hyper-run</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col sm={1} smPush={12}>
              <a href={GITHUB_REPO_URL}>Github</a>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <MappingsForm keyMappings={this.state.keyMappings} onEdit={this.onEditMapping} />
            </Col>
          </Row>
          <Row>
            <ResultsPanel
              keyMappings={this.state.keyMappings.filter(isMappingFinished)}
              onImportClick={this.onImportClick}
            />
          </Row>
          <Row><Debug data={() => JSONGenerator.render(this.state.keyMappings, { pretty: 2 })} /></Row>
        </Grid>
      </div>
    )
  }

  onEditMapping = (index, field) => (evt) => {
    let value = evt.target.value
    if ('hotkey' === field && value.length > 1) {
      value = value.slice(-1)
    }

    const newMappings = this.state.keyMappings.map((mapping, idx) => {
      if (idx !== index) {
        return mapping
      } else {
        return { ...mapping, [field]: value }
      }
    }).filter(isMappingStarted)

    if (newMappings.every(isMappingFinished)) {
      newMappings.push(EMPTY_MAPPING)
    }

    this.setState({ keyMappings: newMappings })
  }

  onImportClick = async () => {
    if (!validate(this.state.keyMappings)) return //TODO: show error

    const jsonUrl = await this.storage.save(JSONGenerator.render(this.state.keyMappings))
    if (!jsonUrl) return //TODO: show error

    window.location.href = `${KARABINER_IMPORT_URL}${encodeURIComponent(jsonUrl)}`
  }
}

export default App
