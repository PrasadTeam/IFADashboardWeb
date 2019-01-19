import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Policy from './policy';

class IFADashBoard extends Component
{

   render()
   {
     // add different style based on status
   return (
              <div>
                    {this.renderPolicies()}
                    {this.props.policies.length === 0 && "Please Create New Policies"}
              </div> 
          );
   }


   renderPolicies()
   {
    // console.log("inside IFA Dashboard Render",this.props.policies.length);   
    
    if(this.props.policies.length === 0) return <p>No Policies available !!</p>;
       return (
    <div>
        <div className="row" style={{border: "0.1rem outset grey",font: "bold 1rem sans-serif"}}> 
            <div className="col-md-2">Policy Number </div>
            <div className="col-md-2">First Name </div>
            <div className="col-md-2">Last Name </div>
            <div className="col-md-2">DOB </div>
            <div className="col-md-2">NB Date </div>
            <div className="col-md-2">Status</div>
        </div>
        {this.props.policies.map(
         policy => <Policy key={policy.id} policy={policy} />)
        }
        
       </div>
      );  

   }
   
  }


export default IFADashBoard;
