import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Logout extends Component
{

    render()
    {
      return (
    <form onSubmit={this.props.invokeLogout}> 
    
    <input type="submit" name="logout" value="Logout" id="Logout" />

    {/* <table style={{cellspacing:"0"}} >
      <tbody>
           
           <tr>
               <td >
               
               </td>
           </tr>

      </tbody>


    </table> */}
    </form>
    );
    }

    
}

export default Logout;