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
import validate, { isMappingStarted, isMappingFinished } from './lib/utils/validateMappings'

const GITHUB_REPO_URL = 'https://github.com/dreyks/karabiner-hyper-run'
const KARABINER_URL = 'https://github.com/tekezo/Karabiner-Elements'
const KARABINER_IMPORT_URL = 'karabiner://karabiner/assets/complex_modifications/import?url='
const EMPTY_MAPPING = { keyCode: '', app: '' }

class App extends Component {
  state = {
    mappings: [EMPTY_MAPPING]
  }

  storage = new Storage()

  render() {
    const debugInfo = <Debug data={() => JSONGenerator.render(this.state.mappings, { pretty: 2 })} />
    
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
              <MappingsForm mappings={this.state.mappings} onEdit={this.onEditMapping} />
            </Col>
          </Row>
          <Row>
            <ResultsPanel
              mappings={this.state.mappings.filter(isMappingFinished)}
              onImportClick={this.onImportClick}
            />
          </Row>
          {debugInfo && <Row>{debugInfo}</Row>}
        </Grid>
      </div>
    )
  }

  onEditMapping = (index, field) => (evt) => {
    let value = evt.target.value
    if ('keyCode' === field && value.length > 1) {
      value = value.slice(-1)
    }

    const newMappings = this.state.mappings.map((mapping, idx) => {
      if (idx !== index) {
        return mapping
      } else {
        return { ...mapping, [field]: value }
      }
    }).filter(isMappingStarted)

    if (newMappings.every(isMappingFinished)) {
      newMappings.push(EMPTY_MAPPING)
    }

    this.setState({ mappings: newMappings })
  }

  onImportClick = async () => {
    if (!validate(this.state.mappings)) return //TODO: show error

    const jsonUrl = await this.storage.save(JSONGenerator.render(this.state.mappings))
    if (!jsonUrl) return //TODO: show error

    window.location.href = `${KARABINER_IMPORT_URL}${encodeURIComponent(jsonUrl)}`
  }
}

export default App
