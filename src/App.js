import React, { Component } from 'react';
import { Navbar, Panel, Button } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar inverse={true}>
          <Navbar.Header>
            <Navbar.Brand><a href="/">Karabiner-Elements hyper-run</a></Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div className="container">
          <div className="text-right">
            <a href="https://github.com/dreyks/karabiner-hyper-run">Github</a>
          </div>
        </div>
        <Panel header={<h3>Use hyper key to run apps</h3>}>
          <ul>
            {
              Object.entries(this.props.apps || {}).map((key, app) => (
                <li>Change hyper + {key} to run {app}</li>
              ))
            }
          </ul>
          <Button href="karabiner://karabiner/assets/complex_modifications/import?url=.json" bsStyle="primary">Import</Button>
        </Panel>
      </div>
    );
  }
}

export default App;
