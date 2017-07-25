import React, { Component } from 'react'
import {
  Navbar,
  Panel,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Row,
  Col,
  Grid,
} from 'react-bootstrap'

import 'bootstrap-css-only'

const GITHUB_REPO_URL = 'https://github.com/dreyks/karabiner-hyper-run'
const EMPTY_MAPPING = { hotkey: '', app: '' }

class App extends Component {
  state = {
    keyMappings: [{ hotkey: '', app: '' }],
  }

  render() {
    return (
      <div className="App">
        <Navbar inverse={true}>
          <Navbar.Header>
            <Navbar.Brand><a href="/">Karabiner-Elements hyper-run</a></Navbar.Brand>
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
              {this.renderForm()}
            </Col>
          </Row>
          <Row>
            {this.renderPanel()}
          </Row>
        </Grid>
      </div>
    )
  }

  renderForm() {
    return (
      <Form horizontal>
        <FormGroup>
          <Col sm={2}><ControlLabel>Key</ControlLabel></Col>
          <Col sm={10}><ControlLabel>App</ControlLabel></Col>
        </FormGroup>
        {
          this.state.keyMappings.map(({ hotkey, app }, idx) => (
            this.renderFormItem(hotkey, app, idx)
          ))
        }
      </Form>
    )
  }

  renderFormItem(hotkey, app, idx) {
    return (
      <FormGroup key={idx}>
        <Col sm={2}><FormControl type="text" value={hotkey} onChange={this.edit(idx, 'hotkey')}/></Col>
        <Col sm={9}><FormControl type="text" value={app} onChange={this.edit(idx, 'app')}/></Col>
      </FormGroup>
    )
  }

  renderPanel() {
    return (
      <Panel header={<h3>Use hyper key to run keyMappings</h3>}>
        <ul>
          {
            this.state.keyMappings
              .filter(this.isMappingFinished)
              .map(({ hotkey, app }) => (
                <li key={hotkey}>Use hyper + {hotkey} to run {app}</li>
              ))
          }
        </ul>
        <Button onClick="karabiner://karabiner/assets/complex_modifications/import?url=.json" bsStyle="primary">Import</Button>
      </Panel>
    )
  }

  edit = (index, field) => (evt) => {
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

  isMappingFinished({ hotkey, app }) {
    return hotkey && app
  }

  isMappingStarted({ hotkey, app }) {
    return hotkey || app
  }
}

export default App
