import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class TextFieldControl extends Component
{

   state = { name:'', value:''};

   constructor(props)
   {
     super(props);      

     this.state.name = this.props.name;
     this.state.value = this.props.value;
     this.state.label = this.props.label;
     this.state.type = this.props.type;
   }
   
   onNameChange = (evt) =>
   {
        this.setState({value : evt.target.value});
   };

   render(){
   
   return (
   <react-fragment>
        <span style={{marginLeft:"10px",marginRight:"2px", fontSize:"small"}}>{this.state.label}:</span>
        <input placeholder={this.state.value} 
        name={this.state.name} 
        type={this.state.type}
        value={this.state.value} 
        onChange={this.onNameChange} /> 
        
   </react-fragment> 
    );
   }
}

export default TextFieldControl;