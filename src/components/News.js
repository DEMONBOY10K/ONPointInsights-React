import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      articles : [],
      loading : true,
      page :1,
      totalResults:0,
      customQuery:false
    };
    // document.title = `OnPoint - ${this.props.category.toUpperCase()}`
  }

  async componentDidMount (){
    this.setState({
      customQuery:this.props.customQuery
    },function(){this.loadNews()});
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
  
  // handlePrevClick = async ()=>{
  //   console.log("Inside:"+this.state.page);
  //   this.setState({loading:true})
  //   this.setState({
  //     page : this.state.page - 1},function(){
  //       this.loadNews();
  //     });
    
  // }
  // handleNextClick= async ()=>{
  //   console.log("Inside:"+this.state.page);
  //   this.setState({loading:true})
  //   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //     this.setState({
  //       page : this.state.page + 1 }, function () {
  //         console.log("Increase:"+this.state.page);
  //         this.loadNews();
  //       }
  //     );
  //   }
  // }

  fetchMoreData = async () => {
    this.setState({ page : this.state.page + 1 }, async function () {
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
      articles:this.state.articles.concat(parsedData.articles),
      totalResults : parsedData.totalResults,
    });
    });
    
    console.log(this.state.articles)
  }

  capitalize = (str) => {
    const firstChar = str.charAt(0).toUpperCase();
    const remainingChars = str.slice(1);
    return `${firstChar}${remainingChars}`;
  }
  render() {
    return (
      <>
        <h2 className="text-center my-3">ON Point - {this.state.customQuery?this.state.customQuery:`Top ${this.capitalize(this.props.category)} Headlines`}{this.state.customQuery?"":<sup>{this.props.country.toUpperCase()}</sup>}  </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>

            <div className="container">
              <div className="row">
                {this.state.articles.map((element)=>{
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
        </div>
        </InfiniteScroll>
      </>
    );
  }
}
