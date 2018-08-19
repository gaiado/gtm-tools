import React, { Component } from 'react';
import Main from './components/Main'
import Menu from './components/Menu'
import SearchForm from './components/SearchForm'


class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <div className="container-fluid">
          <SearchForm/>
          <Main/>
        </div>
      </div>
    );
  }
}

export default App;
