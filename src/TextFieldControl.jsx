import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class TextFieldControl extends Component
{

   state = { name:'', value:'',_number:0 };

   constructor(props)
   {
     super(props);      

     console.log("inside TF constructor:"+this.props.value);
     this.state.name = this.props.name;
     this.state.value = this.props.value;
   }
   
   onNameChange = (evt) =>
   {
        this.setState({value : evt.target.value});
   };

   render(){
   
   return (
   <react-fragment>
        <span>{this.state.name}</span>
        <input placeholder={this.state.value} 
        name={this.state.name} 
        value={this.state.value} 
        onChange={this.onNameChange} /> 
        {/* <br></br> */}
   </react-fragment> 
    );
   }
}

export default TextFieldControl;