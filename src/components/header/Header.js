import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from './logo1.png';
import './Header.css';
export const Header = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [utype, setToken] = useState('')
    let _email = localStorage.getItem('email');
    useEffect(() => {
      if(_email)
        setEmail(_email)
        let utype = localStorage.getItem('utype');
        setToken(utype)
    }, [_email])
 
console.log(_email);
console.log(utype);
    function logout()
    {
        alert("Thank you");
     //    isLoggedIn = false;
      //   if (localStorage.getItem()) { 
            //check something in local storage so you can know
            // if you should reload or not 
          localStorage.clear();
          navigate("/", { replace: true });
          window.location.reload();
       
           
     }
    return (
        <div><>
            <nav className="header">
           <img className='logo' src={logo} alt="ICTAK FOOTER"/>  <h2  className='head' >ICTAK TRAINER MANAGEMENT SYSTEM</h2>
            <div className="headlinks">
          
                <Link className="link" to="/">Home</Link>
                {!email && <Link className="link" to="/signup">Trainer Enrollment</Link>}
                {!email && <Link className="link" to="/login">Login</Link>}
                {utype==="admin" && <Link className="link" to="/approve">Approve Trainer</Link>}
                {utype==="admin" && <Link className="link" to="/search">Search Trainer & Allocate</Link>}
                {utype==="admin" && <Link className="link" to="/schedule">View Schedule</Link>}
                {utype==="trainer" && <Link className="link" to="/viewprofile">View Profile</Link>}
                {utype==="trainer" && <Link className="link" to="/viewsch">View Schedule</Link>}
                {utype==="trainer" && <Link className="link" to="/editprofile">Edit Profile</Link>}
                {utype==="trainer" && <Link className="link" to="/showcalendar">Show Calendar</Link>}
    
                {_email && <Link className="link" onClick={logout} to="/">Logout</Link>}
            </div>
           
           </nav>
            <div>
            <br/> {_email &&   <h2 >welcome to ICTAK TRAINER MANAGEMENT SYSTEM as  {utype} <br/> Login Id :{_email}</h2>}
            </div>
            </>
        </div>
    )
}
