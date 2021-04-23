import React from 'react'

import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import MapEditor from './pages/MapEditor';
import ModelEditor from './pages/ModelEditor';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/edit-map">
          <MapEditor />
        </Route>
        <Route path="/edit-model">
          <ModelEditor />
        </Route>
      </Switch>
    </Router>
  )
}
