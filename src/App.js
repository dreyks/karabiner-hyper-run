import React, { Component } from 'react'
import {
  Navbar,
  Row,
  Col,
  Grid
} from 'react-bootstrap'

import 'bootstrap-css-only'

import ResultsPanel from './components/ResultsPanel'
import MappingsForm from './components/MappingsForm'

const GITHUB_REPO_URL = 'https://github.com/dreyks/karabiner-hyper-run'
const KARABINER_URL = 'https://github.com/tekezo/Karabiner-Elements'
const KARABINER_IMPORT_URL = 'karabiner://karabiner/assets/complex_modifications/import?url='
const EMPTY_MAPPING = { hotkey: '', app: '' }

class App extends Component {
  state = {
    keyMappings: [{ hotkey: '', app: '' }]
  }

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
              keyMappings={this.state.keyMappings.filter(this.isMappingFinished)}
              onImportClick={this.onImportClick}
            />
          </Row>
          {this.renderDebug()}
        </Grid>
      </div>
    )
  }

  renderDebug() {
    if (process.env.NODE_ENV === 'production') return

    return (
      <Row>
        <pre>{this.generateJSON(true)}</pre>
      </Row>
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
    }).filter(this.isMappingStarted)

    if (newMappings.every(this.isMappingFinished)) {
      newMappings.push(EMPTY_MAPPING)
    }

    this.setState({ keyMappings: newMappings })
  }

  onImportClick = async () => {
    if (!this.validateMappings()) return //TODO: show error

    const jsonUrl = await this.saveFile(this.generateJSON())
    if (!jsonUrl) return //TODO: show error

    window.location.href = `${KARABINER_IMPORT_URL}${encodeURIComponent(jsonUrl)}`
  }

  isMappingFinished({ hotkey, app }) {
    return hotkey && app
  }

  isMappingStarted({ hotkey, app }) {
    return hotkey || app
  }

  validateMappings() {
    const started = this.state.keyMappings.filter(this.isMappingStarted)
    return started.length && started.every(this.isMappingFinished)
  }

  generateJSON(pretty = false) {
    const json = {
      'title': 'Launch apps by hyper+letters.',
      'rules': this.state.keyMappings.filter(this.isMappingFinished).map(this.mapToRule)
    }

    return JSON.stringify(json, null, pretty ? 2 : null)
  }

  mapToRule = ({ hotkey, app }) => (
    {
      description: `hyper + ${hotkey} for ${app}`,
      manipulators: [
        {
          type: 'basic',
          from: {
            key_code: hotkey,
            modifiers: {
              mandatory: [
                'control',
                'command',
                'option',
                'shift'
              ]
            }
          },
          to: [
            {
              shell_command: `open '/Applications/${app}.app'`
            }
          ]
        }
      ]
    }
  )

  async saveFile(content) {
    const file = new Blob([content], { type: 'text/plain' })
    const data = new FormData()
    data.append('file', file)

    const response = await fetch(
      'https://file.io',
      {
        method: 'POST',
        body: data
      }
    )

    const json = await response.json()
    if (!json.success) return false

    return `https://file.io/${json.key}`
  }
}

export default App
