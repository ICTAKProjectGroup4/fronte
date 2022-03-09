import React from 'react'
import { Link } from 'react-router-dom';
export const Success = () => {
  return (
    <div>Success
        <h1>THANKS YOU FOR REGISTERING AS A TRAINER </h1>

        <h2><br/> You will get Email notifications from Administrator of ICTAK TRAINER MANAGEMENT SYSTEM</h2>
        
        <h3><br/><Link to="/login">Login as Trainer</Link> </h3>
        <br/><br/><br/>
    </div>
  )
}
