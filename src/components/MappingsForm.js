import React, { PureComponent } from 'react'
import { Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap'

export default class MappingsForm extends PureComponent {
  render() {
    return (
      <Form horizontal>
        <FormGroup>
          <Col sm={2}><ControlLabel>Key</ControlLabel></Col>
          <Col sm={10}><ControlLabel>App</ControlLabel></Col>
        </FormGroup>
        {
          this.props.mappings.map(({ keyCode, app }, idx) => (
            this.renderItem(keyCode, app, idx)
          ))
        }
      </Form>
    )
  }

  renderItem(keyCode, app, idx) {
    return (
      <FormGroup key={idx}>
        <Col sm={2}><FormControl type="text" value={keyCode} onChange={this.props.onEdit(idx, 'keyCode')} /></Col>
        <Col sm={9}><FormControl type="text" value={app} onChange={this.props.onEdit(idx, 'app')} /></Col>
      </FormGroup>
    )
  }
}
