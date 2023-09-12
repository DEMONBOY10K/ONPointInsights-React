import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title , description , imgUrl ,newsUrl,author,date,source} = this.props;
    return (
      <div>
        <div className="card" style={{height : "28rem"}}>
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1",fontSize: "xx-small"}}>{source}</span>
          <img src={imgUrl} className="card-img-top" style={{height : "12rem"}} alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title.trim()}...</h5>
            <p  style={{lineHeight: "normal",fontSize: "0.9rem"}}className="card-text">{description.trim()?description.trim():title.trim()}...</p>
            <p className="card-text"><small style={{fontSize : "0.75rem"}} className="text-muted">by {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl}  className="btn btn-primary" target="_blank" rel="noreferrer">ReadMore</a>
          </div>
      </div>
      </div>
    )
  }
}

export default NewsItem