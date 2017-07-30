import React from 'react'
import { Panel, Button } from 'react-bootstrap'

import resoveAppPath from '../lib/utils/resolveAppPath'

export default ({ mappings, onImportClick }) => (
  <Panel header={<h3>Use hyper key to run apps</h3>}>
    <ul>
      {
        mappings
          .map(({ keyCode, app }) => (
            <li key={keyCode}>Use hyper + {keyCode} to run {resoveAppPath(app)}</li>
          ))
      }
    </ul>
    <Button onClick={onImportClick} bsStyle="primary">Import</Button>
  </Panel>
)
