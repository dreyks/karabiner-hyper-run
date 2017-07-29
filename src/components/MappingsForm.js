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
          this.props.keyMappings.map(({ hotkey, app }, idx) => (
            this.renderItem(hotkey, app, idx)
          ))
        }
      </Form>
    )
  }

  renderItem(hotkey, app, idx) {
    return (
      <FormGroup key={idx}>
        <Col sm={2}><FormControl type="text" value={hotkey} onChange={this.props.onEdit(idx, 'hotkey')} /></Col>
        <Col sm={9}><FormControl type="text" value={app} onChange={this.props.onEdit(idx, 'app')} /></Col>
      </FormGroup>
    )
  }
}
