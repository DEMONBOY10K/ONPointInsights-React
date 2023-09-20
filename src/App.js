import logo from './logo.svg';
import './App.css';
<<<<<<< Updated upstream

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
=======
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import AboutPage from './components/About';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API_KEY
  constructor() {
    super();
    this.state={
      category:"general",
      country:"in",
      btnDisable:false,
      key:0,
      query:false,
      aboutPage:false,
      progress:0
    }
  }
  
  handleCountry = (country) => {
    this.setState({ country: country.toString().toLowerCase(),query:false, key: this.state.key + 1 }, () => {
    });
  }
  
  handleCategory = (category) => {
    this.setState({ category: category.toString().toLowerCase(),query:false, key: this.state.key + 1 }, () => {
    });
  }
  handleQuery = (query)=>{
    this.setState({ query : query, key: this.state.key + 1 }, () => {
      console.log("query=" + this.state.query);
    });
  }
  handleAboutPage = (result)=>{
    this.setState({aboutPage:result});
  }
  handleProgress = (result)=>{
    this.setState({progress:result});
  }
  render() {
    return (
      <div>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
        />
        <Navbar toggleFilter={this.handleFilter} toggleCategory = {this.handleCategory} toggleCountry = {this.handleCountry} toggleQuery={this.handleQuery} toggleAbout={this.handleAboutPage}/>
        {!this.state.aboutPage && <News key={this.state.key}
              pageSize={15} 
              country={this.state.country} 
              apiKey={this.apikey} 
              category={this.state.category} 
              customQuery={this.state.query}
              setProgress = {this.handleProgress}/> }
        {this.state.aboutPage && <AboutPage/>}
      </div>
    )
  }
>>>>>>> Stashed changes
}

export default App;
