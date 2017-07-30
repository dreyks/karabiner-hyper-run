import React from 'react'
import { Panel, Button } from 'react-bootstrap'

export default ({ mappings, onImportClick }) => (
  <Panel header={<h3>Use hyper key to run apps</h3>}>
    <ul>
      {
        mappings
          .map(({ keyCode, app }) => (
            <li key={keyCode}>Use hyper + {keyCode} to run {app}</li>
          ))
      }
    </ul>
    <Button onClick={onImportClick} bsStyle="primary">Import</Button>
  </Panel>
)
