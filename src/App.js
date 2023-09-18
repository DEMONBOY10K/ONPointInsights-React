import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import AboutPage from './components/About';

export default class App extends Component {
  constructor() {
    super();
    this.state={
      // filter:"top-headlines",
      category:"general",
      country:"in",
      btnDisable:false,
      key:0,
      query:false,
      aboutPage:false
    }
  }
  // handleFilter = (filter) => {
  //   // console.log("Filter="+filter);
  //   switch (filter){
  //      case "No-filter":{
  //       this.setState({filter:"everything"})
  //       break;
  //     }
  //     case "Filter-Top":{
  //       this.setState({filter:"top-headlines"})
  //       break;
  //     }
  //     default :{
  //       this.setState({filter:"top-headlines"})
  //     }
  //   }
 
  // }
  handleCountry = (country) => {
    // console.log("Country=" + country);
    // Use the callback function to log the updated state
    this.setState({ country: country.toString().toLowerCase(),query:false, key: this.state.key + 1 }, () => {
      // console.log("Key=" + this.state.key);
    });
  }
  
  handleCategory = (category) => {
    // console.log("Category=" + category);
    // Use the callback function to log the updated state
    this.setState({ category: category.toString().toLowerCase(),query:false, key: this.state.key + 1 }, () => {
      // console.log("Key=" + this.state.key);
    });
  }
  handleQuery = (query)=>{
    this.setState({ query : query, key: this.state.key + 1 }, () => {
      console.log("query=" + this.state.query);
    });
  }
  handleAboutPage = (result)=>{
    this.setState({aboutPage:result});
    // console.log(this.state.aboutPage);
  }
  render() {
    return (
      <div>
        <Navbar toggleFilter={this.handleFilter} toggleCategory = {this.handleCategory} toggleCountry = {this.handleCountry} toggleQuery={this.handleQuery} toggleAbout={this.handleAboutPage}/>
        {!this.state.aboutPage && <News key={this.state.key}
              pageSize={15} 
              country={this.state.country} 
              apiKey={"00c5917e46e84b66b98b0ab82260348d"} 
              // headlineType={this.state.filter}
              category={this.state.category} 
              customQuery={this.state.query}/> }
        {this.state.aboutPage && <AboutPage/>}
      </div>
    )
  }
}




