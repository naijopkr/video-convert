import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import ConvertScreen from './screens/ConvertScreen'
import VideoSelectScreen from './screens/VideoSelectScreen'

import './index.css'

const app = (
  <Provider store={store}>
    <Router>
      <div className="app">
        <Switch>
          <Route path="/convert" component={ConvertScreen} />
          <Route path="/" component={VideoSelectScreen} />
        </Switch>
      </div>
    </Router>
  </Provider>
)

ReactDOM.render(
  app, 
  document.querySelector('#root')
)