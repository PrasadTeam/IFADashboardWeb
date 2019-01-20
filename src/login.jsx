import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TextFieldControl from './TextFieldControl.jsx';
class Login extends Component
{

    render()
    {
      return (
    <form onSubmit={this.props.invokeLogin}> 
    
    <table style={{cellspacing:"0"}} role="presentation">
      <tbody>
           
           <tr>
               <td>
                 <TextFieldControl type="text" name="userid" label="User Id" value="" />
               </td>

               <td>
                 <TextFieldControl type="password" name="password" label="Password" value="" />
               </td>

               <td style={{paddingLeft: "10px"}}>
               <input type="submit" name="login" value="Log In" id="Login  Id" />
               </td>
           </tr>

      </tbody>


    </table>
    </form>
    );
    }

    
}

export default Login;
