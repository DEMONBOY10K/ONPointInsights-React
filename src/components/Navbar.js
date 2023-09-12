import React, { Component} from 'react'

export default class Navbar extends Component {
  constructor() {
    super();
    this.countryIconStyle = {
      width: "25px",
      height: "25px",
      objectFit: "cover",
      borderRadius: "50%"
    };
    this.state={
      // filter:"Filter-Top",
      category:"General",
      country:"IN",
      btnDisable:false,
      query:false,
      queryText:"",
      searchDisabled:true
    }
  }
  // filterRef = useRef(this.state.filter);
  // toggleFilter = (event)=>{
  //   this.setState({filter: event.target.textContent.trim()})
  //   // this.setState({
  //   // btnDisable:true})
  //   // console.log(event.target.textContent.trim())
  //   setTimeout(()=>{
  //     this.setState({btnDisable:true})
  //     this.props.toggleFilter(this.state.filter)
  //   },100)
  //   setTimeout(()=>{
  //     this.setState({btnDisable:false})
  //   },2000)

  // }
  toggleCategory = (event)=>{
    // console.log(event.target.textContent.trim())
    this.setState({category: event.target.textContent.trim()})
    setTimeout(()=>{
        this.setState({btnDisable:true})
        this.props.toggleCategory(this.state.category)
      },100)
    setTimeout(()=>{
      this.setState({btnDisable:false})
    },2000)
  }
  toggleCountry = (event)=>{
    // console.log(event.target.textContent)
    let newCountry = event.target.textContent.trim()
    this.setState({country:newCountry})
      setTimeout(()=>{
        this.setState({btnDisable:true})
        if(newCountry === "UK"){
          this.props.toggleCountry("GB")
        }
        else{
          this.props.toggleCountry(this.state.country)
        }
      },100)
    setTimeout(()=>{
      this.setState({btnDisable:false})
    },2000)
  }
  toggleQuery = (event)=>{
    console.log(this.state.queryText)
    if(this.state.queryText===""){
      
    }else{
      event.preventDefault();
      // console.log(event.target.textContent)
      let newQuery = event.target.textContent.trim()
      this.setState({query:newQuery})
        setTimeout(()=>{
          this.setState({btnDisable:true})
          this.props.toggleQuery(this.state.queryText)
          console.log(this.state.queryText)
        },100)
      setTimeout(()=>{
        this.setState({btnDisable:false})
      },2000)
    }
  }
  handleInputChange = (e) => {
    console.log(e.target.value.toString())
    if(e.target.value.toString()!==""){
      this.setState({ queryText: e.target.value,searchDisabled:false }); 
    }else{
      this.setState({searchDisabled:true }); 
    }
  };

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">OP Insights</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
            </ul>
            {/* <div className="dropdown">
              <button className="btn btn-light dropdown-toggle mx-2 my-1" disabled={this.state.btnDisable} type="button" id="dropdownMenuButton"data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fa fa-filter" aria-hidden="true"> {this.state.filter}</i>
              
              </button>
              <ul className="dropdown-menu" style={{minWidth: "5rem"}} aria-labelledby="dropdownMenuButton">
                <li><button className="dropdown-item" onClick={this.toggleFilter}><i className="fa fa-ban"></i> <b>No-Filter</b></button></li>
                <li><button className="dropdown-item" onClick={this.toggleFilter}><i className="fa fa-chart-line"></i> <b>Filter-Top</b></button></li>
                
              </ul>
            </div>  */}
            <div className="d-flex">
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle mx-2 my-1" disabled={this.state.btnDisable} type="button" id="dropdownMenuButton"data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-list"> Category : {this.state.category}</i>
                </button>
                <ul className="dropdown-menu" style={{minWidth: "5rem"}} aria-labelledby="dropdownMenuButton">
                    <li><button className="dropdown-item" onClick={this.toggleCategory}><i className="fa fa-briefcase"></i> <b>Business</b></button></li>
                    <li><button className="dropdown-item" onClick={this.toggleCategory}><i className="fa fa-film"></i> <b>Entertainment</b></button></li>
                    <li><button className="dropdown-item" onClick={this.toggleCategory}><i className="fa fa-file-invoice"></i> <b>General</b></button></li>
                    <li><button className="dropdown-item" onClick={this.toggleCategory}><i className="fa fa-heartbeat"></i> <b>Health</b></button></li>
                    <li><button className="dropdown-item" onClick={this.toggleCategory}><i className="fa fa-flask"></i> <b>Science</b></button></li>
                    <li><button className="dropdown-item" onClick={this.toggleCategory}><i className="fa fa-football-ball"></i> <b>Sports</b></button></li>
                    <li><button className="dropdown-item" onClick={this.toggleCategory}><i className="fa fa-briefcase"></i> <b>Technology</b></button></li>
                </ul>
              </div> 
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle mx-2 my-1" disabled={this.state.btnDisable} type="button" id="dropdownMenuButton"data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-globe" aria-hidden="true"> {this.state.country}</i>
                </button>
                <ul className="dropdown-menu" style={{minWidth: "5rem"}} aria-labelledby="dropdownMenuButton">
                    <li><button className="dropdown-item" onClick={this.toggleCountry}><img style={this.countryIconStyle} alt="INDIA" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/IN.svg"/><b> IN</b></button></li>
                    <li><button className="dropdown-item" onClick={this.toggleCountry}><img style={this.countryIconStyle} alt="USA" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"/><b> US</b></button></li>
                    <li><button className="dropdown-item" onClick={this.toggleCountry}><img style={this.countryIconStyle} alt="UK" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"/><b> UK</b></button></li> 
                    <li><button className="dropdown-item" onClick={this.toggleCountry}><img style={this.countryIconStyle} alt="CHINA" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/CN.svg"/><b> CN</b></button></li> 
                    <li><button className="dropdown-item" onClick={this.toggleCountry}><img style={this.countryIconStyle} alt="JAPAN" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/JP.svg"/><b> JP</b></button></li> 
                    <li><button className="dropdown-item" onClick={this.toggleCountry}><img style={this.countryIconStyle} alt="CANADA" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/CA.svg"/><b> CA</b></button></li> 
                    <li><button className="dropdown-item" onClick={this.toggleCountry}><img style={this.countryIconStyle} alt="SOUTHAFRICA"src="http://purecatamphetamine.github.io/country-flag-icons/3x2/ZA.svg"/><b> ZA</b></button></li> 
                    <li><button className="dropdown-item" onClick={this.toggleCountry}><img style={this.countryIconStyle} alt="ASUTRALIA" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/AU.svg"/><b> AU</b></button></li> 
                    <li><button className="dropdown-item" onClick={this.toggleCountry}><img style={this.countryIconStyle} alt="BRAZIL" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg"/><b> BR</b></button></li> 
                    <li><button className="dropdown-item" onClick={this.toggleCountry}><img style={this.countryIconStyle} alt="GERMANY" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/DE.svg"/><b> DE</b></button></li> 
                    <li><button className="dropdown-item" onClick={this.toggleCountry}><img style={this.countryIconStyle} alt="FRANCE" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg"/><b> FR</b></button></li> 
                    <li><button className="dropdown-item" onClick={this.toggleCountry}><img style={this.countryIconStyle} alt="ITALY" src="http://purecatamphetamine.github.io/country-flag-icons/3x2/IT.svg"/><b> IT</b></button></li> 
                </ul>
              </div>  
            </div>
            <form className="d-flex mx-2 my-1" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={this.state.searchQuery} onChange={this.handleInputChange}/>
              <button className="btn btn-outline-success" disabled={this.state.searchDisabled} onClick={this.toggleQuery} type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
  }
}
