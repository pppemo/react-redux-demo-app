import React, { Component } from 'react'
import './App.css'
import Countries from './containers/countries/Countries'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Countries/>
      </div>
    )
  }
}

export default App
