import React, { Component } from 'react'
import ReactDOM from 'react-dom';

class Header extends Component{

   render()
   {
     
     
     return ( 
    <div style={{background:"#8888ff"}}>
      
     <b>Welcome {this.props.agentname}. Your Advisor Id is {this.props.agentno}</b>
    </div>
    );
     
     
   }
}

export default Header;