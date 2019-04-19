import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Logout from "./logout.jsx";
class Header extends Component{

   render()
   {
     
     
     return ( 
    <div style={{background:"#f0f0ff"}}>
     <div style={{float:"left"}}> 
     <b>Welcome {this.props.agentname} !!!. Your Advisor Id is {this.props.agentno}</b> 
     </div>
     <div style={{float:"right"}}> 
     <Logout invokeLogout={this.props.invokeLogout}/>
     </div>
    </div>
    );
     
     
   }
}

export default Header;
