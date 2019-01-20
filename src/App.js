import React, { Component } from 'react';
import IFADashBoard from './IFADashBoard.jsx';
import Header from './Header.jsx';
import Login from "./login.jsx";
import Logout from "./logout.jsx";
import TextFieldControl from './TextFieldControl';

//http://35.176.228.164:3002

class App extends Component {

  state = { 
    _isLoggedIn: false,
    agentno : "",
    agentname: "", 
    firm : "Firm2",
    filter: {},
    policies : [
     
     ]
  };

  render()
  {
    if(!this.state._isLoggedIn)
       return this.renderLogin(); 

    return this.renderApp();
  }
  

  renderLogin() {

    return (
        <div style={{ height:"40px",width:"600px",background:"#0f88ff"}}>
        
        <div><Login invokeLogin={this.invokeLogin}/></div>
        </div>
        
    );
  }
  
  renderApp() {

     return (

    
      <div>
       
        <div style={{ height:"32px",maxwidth:"400px",background:"#f0f0f0", borderBottom:"0.1rem outset blue", borderBottomColor:"#0000ff" }}>
        <Header agentno={this.state.agentno} agentname={this.state.agentname} invokeLogout={this.invokeLogout} />
        </div>
        
        
        
        <div style={{ paddingTop:"2px", paddingBottom:"2px", borderBottom:"0.1rem outset blue 20px", borderBottomColor:"#0000dd"}}>
        
        
         <b style={{paddingTop:"0px", paddingLeft:"1px", paddingBottom:"20px",fontSize:"small"}}>Search Panel</b> 
         <hr></hr>
         
         <button style={{ marginLeft: "0px", marginRight: "125px"}} className="btn btn-secondary btn-sm" onClick={() => this.buttonClick({"status":"Inforce"})}> GetInforce </button> 
         <button style={{ marginRight: "125px"}} className="btn btn-secondary btn-sm" onClick={() => this.buttonClick({"firm":this.state.policies[0].firm})}> Firm Policies </button>
         <button style={{ marginRight: "5px"}} className="btn btn-secondary btn-sm" onClick={() => this.buttonClick({"agentno":this.state.agentno})}> My Policies </button>
         
         <hr></hr>
         <form onSubmit= { this.buttonDateRangeClick}>     
         
         <TextFieldControl label="NB From" name="NBFrom" value="" type="text" />
         <TextFieldControl label="NB To" name="NBTo" value="" type="text" />
         <input type="submit" value="Search" style={{ marginLeft: "5px"}} className="btn btn-secondary btn-sm" /> 
         </form>
        

        
        </div>

        <hr></hr> 
        
        <div style={{background:"#f0f0f0"}}><IFADashBoard agentno={this.state.agentno} policies={this.state.policies}/></div>
      
        
      </div>
      
    );
  }

  buttonDateRangeClick = (event) =>
  {

    event.preventDefault();  
    console.log("inforce date range ..!!");

    

    let param = {
      "fromDate":event.target.NBFrom.value,"toDate":event.target.NBTo.value
    };

    let fromDate = new Date(param["fromDate"]);
    let toDate = new Date(param["toDate"]);

    this.setState({'policies' : this.state.policies.filter(policy => (new Date(policy.nbdate) > fromDate && new Date(policy.nbdate) < toDate))});
  };


  componentDidMount()
  {
    //  console.log("componenet did mount in App.js");
     if(!this.state._isLoggedIn)
    {
     let res = fetch('http://35.176.228.164:3002/api/fetchIFADetails', {
       method: 'post',
       body: JSON.stringify({'agentno' : this.state.agentno}),
       headers: {Accept: "application/json", 'Content-Type' : 'application/json','Access-Control-Allow-Origin': '*'}
      }).then(response => {return response.json();}).then(data => this.setState({'policies' : data}));   
    }
  }

  buttonClick = (matchparam) =>{
    
    console.log(JSON.stringify(matchparam));

     if(matchparam["status"] != null) 
     {
           
        this.setState({'policies' : this.state.policies.filter(policy => policy.status == 'Inforce')});
        console.log("inforce clicked..!!");

     }

     else
     {     let res = fetch('http://35.176.228.164:3002/api/fetchIFADetails', {
       method: 'post',
       body: JSON.stringify(matchparam),
       headers: {Accept: "application/json", 'Content-Type' : 'application/json','Access-Control-Allow-Origin': '*'}
      }).then(response => {return response.json();}).then(data => this.setState({'policies' : data}));   //
    }
  };

  invokeLogin = (e) =>
    {
          e.preventDefault();
          console.log("inside submit click");

          let userObj = 
          {
            login:e.target.userid.value,
            password:e.target.password.value
          };

          let loginName = userObj["login"];

         let res = fetch('http://35.176.228.164:3002/api/validateLogin', {
            method: 'post',
            body: JSON.stringify(userObj),
            headers: {Accept: "application/json", 'Content-Type' : 'application/json','Access-Control-Allow-Origin': '*'}
           }).then(response => {return response.json();}).then( (data) => {this.fetchresults(data,loginName)}).catch(function(error) {
            console.log(error);
        });

    }; 

    fetchresults(param,loginName)
    {
      console.log("inside fetch results",param,loginName);

      this.state.agentname = loginName;

      if(param["agentno"] == null) 
      {
            alert("user id / password incorrect! please enter valid credentials");
            //document.getElementById("")
      }
      else
      {
      let res = fetch('http://35.176.228.164:3002/api/fetchIFADetails', {
        method: 'post',
        body: JSON.stringify(param),
        headers: {Accept: "application/json", 'Content-Type' : 'application/json','Access-Control-Allow-Origin': '*'}
       }).then(response => {return response.json();}).then( data =>  this.setState({'policies' : data,'_isLoggedIn':true,'agentno':param["agentno"]})); 
      }
    }

    invokeLogout = (e) =>
    {
          e.preventDefault();
  
          let tempState = { 
            _isLoggedIn: false,
            agentno : "",
            agentname: "", 
            firm : "",
            filter: {},
            policies : [
             
             ]
          };
        

          this.setState(tempState); 

          this.setState({_isLoggedIn : false});

    }; 


}

export default App;
