import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Logout extends Component
{

    render()
    {
      return (
    <form onSubmit={this.props.invokeLogout}> 
    
    <table style={{cellspacing:"0"}} role="presentation">
      <tbody>
           
           <tr>
               <td >
               <input type="submit" name="logout" value="Logout" id="Logout" />
               </td>
           </tr>

      </tbody>


    </table>
    </form>
    );
    }

    
}

export default Logout;