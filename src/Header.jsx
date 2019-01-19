import React, { Component } from 'react'
import ReactDOM from 'react-dom';

class Header extends Component{

   render()
   {
     
     
     return ( 
    
      
     <b>Welcome {this.props.agentname}. Your Advisor Id is {this.props.agentno}</b>
    
    );
     
     
   }
}

export default Header;