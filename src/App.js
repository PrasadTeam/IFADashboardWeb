import React, { Component } from 'react';
import IFADashBoard from './IFADashBoard.jsx';
import Header from './Header.jsx';
import Login from "./login.jsx";
import Logout from "./logout.jsx";
import TextFieldControl from './TextFieldControl';
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

    //   <Router> 
    //     <Switch>
    //   <Route path="/" exact render={()=><Login num="2" someProp={100}/>}  />
    //   {/* <Route path="/dashboard" component={IFADashBoard}  /> */}
    //    <Route path="/IFA" component={Sample}/>  
    //   </Switch>
    //  </Router>

        <div style={{background:"#0f0f0f"}}>

        <div style={{ height:"40px",minwidth:"980px",background:"#0f00ff"}}>
        
        <div><Login invokeLogin={this.invokeLogin}/></div>
        </div>
        </div>   
        
        
    );
  }
  
  renderApp() {

     return (

    
        <div style={{background:"#0f0f0f"}}>

        <div style={{ height:"82px",minwidth:"980px",background:"#0f00ff"}}><Header agentno={this.state.agentno} agentname="Prasad"/>
        
        <div style={{align:"right"}}><Logout invokeLogout={this.invokeLogout}/></div>
        </div>
           
        
        <div>
        <div style={{background:"#bb88ff"}}>
         <button style={{ marginRight: "5px"}} className="btn btn-secondary btn-sm" onClick={() => this.buttonClick({"status":"Inforce"})}> GetInforce </button> 
         
         <button style={{ marginRight: "5px"}} className="btn btn-secondary btn-sm" onClick={() => this.buttonClick({"firm":this.state.policies[0].firm})}> Firm Policies </button>
         
         <button style={{ marginRight: "5px"}} className="btn btn-secondary btn-sm" onClick={() => this.buttonClick({"agentno":this.state.agentno})}> My Policies </button>
         <form onSubmit= { this.buttonDateRangeClick}>     
         <TextFieldControl name="NBFrom" value="" />
         <TextFieldControl name="NBTo" value="" />
         <input type="submit" value="Search" style={{ marginRight: "5px"}} className="btn btn-secondary btn-sm" /> 
         </form>
        </div>

        <p></p>  
        <div style={{background:"#8888ff"}}><IFADashBoard agentno={this.state.agentno} policies={this.state.policies}/></div>
         </div>
      </div>
      
    );
  }

  buttonDateRangeClick = (event) =>
  {

    event.preventDefault();  
    console.log("inforce date range ..!!");
    
    let param = {
      "fromDate":event.target.NBFrom.value,"toDate":event.target.NBTo.value};

      this.setState({'policies' : this.state.policies.filter(policy => (policy.nbdate > param["fromDate"] && policy.nbdate < param["toDate"]))});
      

     console.log(JSON.stringify(param));  
  };

  

  


  componentDidMount()
  {
    //  console.log("componenet did mount in App.js");

     let res = fetch('http://localhost:3002/api/fetchIFADetails', {
       method: 'post',
       body: JSON.stringify({'agentno' : this.state.agentno}),
       headers: {Accept: "application/json", 'Content-Type' : 'application/json','Access-Control-Allow-Origin': '*'}
      }).then(response => {return response.json();}).then(data => this.setState({'policies' : data}));   

  }

  buttonClick = (matchparam) =>{
    //set status is not working???
    // this.setState({status : matchparam} );

    // matchparam['agentno'] = this.props.agentno;

    console.log(JSON.stringify(matchparam));

     if(matchparam["status"] != null) 
     {
           
        this.setState({'policies' : this.state.policies.filter(policy => policy.status == 'Inforce')});
        console.log("inforce clicked..!!");

     }

     else
     {     let res = fetch('http://localhost:3002/api/fetchIFADetails', {
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

          console.log(userObj["login"]);

          // let res = fetch('http://localhost:3002/api/validateLogin', {
          //   method: 'post',
          //   body: JSON.stringify(userObj),
          //   headers: {Accept: "application/json", 'Content-Type' : 'application/json','Access-Control-Allow-Origin': '*'}
          //  }).then(response => {return response.json();}).then(data => this.setState({_isLoggedIn : true, agentno : userObj["login"]}));   //

          let res = fetch('http://localhost:3002/api/validateLogin', {
            method: 'post',
            body: JSON.stringify(userObj),
            headers: {Accept: "application/json", 'Content-Type' : 'application/json','Access-Control-Allow-Origin': '*'}
           }).then(response => {return response.json();}).then( (data) => this.fetchresults(data));
           
          //  onClick={() => this.buttonClick({"status":"Inforce"})}

          //  data => this.setState({_isLoggedIn : true, agentno : userObj["login"]})

      //      fetch('http://localhost:3002/api/fetchIFADetails', {
      //  method: 'post',
      //  body: JSON.stringify({"agentno":this.state.agentno}),
      //  headers: {Accept: "application/json", 'Content-Type' : 'application/json','Access-Control-Allow-Origin': '*'}
      // }).then(response => {return response.json();}).then(data => this.setState({'policies' : data}));   //


    }; 

    fetchresults(param)
    {
      console.log("inside fetch results",param);
      let res = fetch('http://localhost:3002/api/fetchIFADetails', {
        method: 'post',
        body: JSON.stringify(param),
        headers: {Accept: "application/json", 'Content-Type' : 'application/json','Access-Control-Allow-Origin': '*'}
       }).then(response => {return response.json();}).then( data =>  this.setState({'policies' : data,'_isLoggedIn':true,'agentno':param["agentno"]}));   //

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
