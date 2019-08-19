import React, { Component } from 'react';
import './App.css';
import PageLoadingGif from './images/page-loading.gif';
import Header from './components/Header';
import SearchBar from './containers/SearchBar';
import Buttons from './containers/Buttons';
import CardListContainer from './containers/CardListContainer';
import Footer from './components/Footer';

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      loading: true
    }
  }
  componentDidMount () {
    this.setState({
      loading: false
    })
  }
  render() {
    return (
      <div className="App">
        {
        this.state.loading
        ?
        <div className="page-loading">
          <img src={PageLoadingGif} alt="" />
        </div>
        :
        <div>
          <Header />
          <SearchBar />
          <Buttons />
          <CardListContainer />
          <Footer />
        </div>
        }
      </div>
    );
  }
}

export default App;
