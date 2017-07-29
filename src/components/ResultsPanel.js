import React from 'react'
import { Panel, Button } from 'react-bootstrap'

export default ({ keyMappings, onImportClick }) => (
  <Panel header={<h3>Use hyper key to run keyMappings</h3>}>
    <ul>
      {
        keyMappings
          .map(({ hotkey, app }) => (
            <li key={hotkey}>Use hyper + {hotkey} to run {app}</li>
          ))
      }
    </ul>
    <Button onClick={onImportClick} bsStyle="primary">Import</Button>
  </Panel>
)
