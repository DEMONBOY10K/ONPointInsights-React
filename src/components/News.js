import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
  
  constructor() {
    super();
    // console.log(this.props.customQuery);
    this.state = {
      articles : [],
      loading : true,
      page :1,
      customQuery:false
    };
  }

  async componentDidMount (){
    this.setState({
      customQuery:this.props.customQuery
    },function(){this.loadNews()});
    
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles:parsedData.articles,
    //   totalResults : parsedData.totalResults,
    //   loading:false
    // });
    // console.log(this.state.articles)
  }
  async loadNews(){
    let url;
    if(this.state.customQuery===false){
      url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    }
    else{
      url = `https://newsapi.org/v2/everything?q=${this.state.customQuery}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    }
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles:parsedData.articles,
      totalResults : parsedData.totalResults,
      loading:false
    });
    console.log(this.state.articles)
  }
  
  handlePrevClick = async ()=>{
    console.log("Inside:"+this.state.page);
    this.setState({loading:true})
    // this.setState({
    //   page : this.state.page - 1,
    // })
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      page : this.state.page - 1},function(){
        this.loadNews();
      });
    // console.log("Decrease:"+this.state.page);
    // this.setState({});
    // this.state.loading = false;
  }
  handleNextClick= async ()=>{
    console.log("Inside:"+this.state.page);
    this.setState({loading:true})
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      this.setState({
        page : this.state.page + 1 }, function () {
          console.log("Increase:"+this.state.page);
          this.loadNews();
        }
      );
      // console.log("Increase:"+this.state.page);
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // console.log(parsedData);
      // this.setState({articles:parsedData.articles});
      // this.setState({loading:false})
    }
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">ON Point - {this.state.customQuery?this.state.customQuery:"Top-Headlines"}</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4 my-3" key={element.url}>
            <NewsItem
              title={element.title?element.title.slice(0,55):""}
              description={element.description?element.description.slice(0,90):""}
              imgUrl={element.urlToImage?element.urlToImage:"https://lh3.googleusercontent.com/drive-viewer/AITFw-wmPBUgIaLzN3Dwfcd9o5XQdXa1qC6yCChRyyOPw6AewufL9ZQ42UoPubWe28o0vLilZ5ulSALB4LVVvFoEmefnPUZM=s1600"} 
              newsUrl ={element.url}
              date={element.publishedAt}
              author={element.author}
              source={element.source.name}
              />
          </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled = {this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" disabled = {this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}
