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
        <div className="row" style={{borderBottom: "0.1rem outset lightblue",backgroundColor:"#f0f0f0"}} key={this.props.policy.id}> 
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
         return <div className="col-md-4" >  <button onClick={() => this.handleToggle()} className="btn btn-secondary btn-sm">Show Details</button></div>
         
         
         return (
         <div className="col-md-8" style={{fontSize:"small"}} >
                           <b> Policy Details  </b>
                           <ul>
                           <li>Product Type: {this.props.policy.prodtyp}</li>
                           <li>Policy Type: {this.props.policy.policytyp} </li>
                           </ul>
                           <div className="col-md-4" >  <button onClick={() => this.handleToggle()} className="btn btn-secondary btn-sm">Hide Details</button></div>           
                           <p></p>
          </div>           
        
                 );          
                           
                
    }

}

export default Policy;
