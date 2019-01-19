import React, { Component } from 'react'
import ReactDOM from 'react-dom';

class Policy extends Component{

    state = { 
            _showFulldetails : true
           };


    
    render()
    {
       return (

        <div>
        <div className="row" key={this.props.policy.id}> 
                <div className="col-md-2"> {this.props.policy.polno}  </div>
                <div className="col-md-2"> {this.props.policy.firstname} </div>
                <div className="col-md-2"> {this.props.policy.surname} </div>
                <div className="col-md-2"> {this.props.policy.dob} </div>
                <div className="col-md-2"> {this.props.policy.nbdate} </div>
                <div className="col-md-2"> {this.props.policy.status} </div> 
                
                {this.renderDetails()}             
        </div>
        
        

        </div>

        );
    }


    getStyle()
    {
         let style = (this.props.policy.status == "inforce") ? {fontWeight:'bold'} : {};
         return style;  
    }

    
    handleToggle = () => {

        this.setState({_showFulldetails : !this.state._showFulldetails} );
    };

    renderDetails()
    {
         if(this.state._showFulldetails) 
         return <div className="col-md-4" >  <button onClick={() => this.handleToggle()} className="btn btn-secondary btn-sm">Click here for Details</button></div>
         
         
         return (
         <div className="col-md-7" >
                           <p></p>
                           
                           <b>Policy Details </b> <br></br>
                           Product Type: {this.props.policy.prodtyp}  <br></br>
                           Policy Type: Type: {this.props.policy.policytyp} 
                           <div className="col-md-4" >  <button onClick={() => this.handleToggle()} className="btn btn-secondary btn-sm">Hide Details</button></div>           
          </div>           
        
                 );          
                           
                
    }

}

export default Policy;