import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from './banner.png'
import './Login.css';
import validation from './validation1';
export const Login = (props) => {
  const navigate = useNavigate();
  const [formValues, setFormvalues] = useState({ email: "", password: "", utype: "" });
  //manage errors
  const [formErrors, setFormErrors] = useState({})
  //flag for successuful submit
  const [isSubmit, setIsSubmit] = useState(false);
  //maanage field change
  const handleChange = (event) => {
    //   console.log(event.target);
    //destructuring
    const { name, value } = event.target;
    //spread syntax..the value typing is get appended

    setFormvalues({ ...formValues, [name]: value })
    //console.log(formValues);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validation(formValues));
    setIsSubmit(true);
  }
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      loginUser();
    }
  }, [formErrors])
  async function loginUser() {
    // const user = formValues.username;
    const email = formValues.email;
    const password = formValues.password;
    const utype = formValues.utype;
    console.log("utype", utype)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, utype })
    };

    const response = await fetch(`http://localhost:5000/api/userlogin`, requestOptions);
    // const response = await fetch(`https://smith-blog.herokuapp.com/api/login`);
    console.log(response.body, "response");
    if (response.status != 201) {
      //Window
      localStorage.setItem('email', email);
      localStorage.setItem('utype', utype);
      localStorage.setItem('token', response.token);

      alert('Successfullly logged into ICTK Trainer Application ');

      navigate("/", { replace: true });
    }
    else {
      alert('error... authentication failed');

    }

  }
  return (
    <div>
      <div class="row">
        <div class="column"><img className='poster' src={banner} alt="ICTAK poster" /></div>
        <div class="column">

          <form onSubmit={handleSubmit}><br /><br />
            <h1>LOGIN</h1> &nbsp;&nbsp; <br /><br />
            <label for="chk" aria-hidden="true">Email Id</label>&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="email" name="email" placeholder="Email" required="" value={formValues.email} onChange={handleChange} />
            <p className='error'>{formErrors.email}</p>
            <br /><label for="chk" aria-hidden="true">Password</label>&nbsp;&nbsp;
            <input type="password" name="password" placeholder="Password" required="" value={formValues.password} onChange={handleChange} /> <p className='error'>{formErrors.password}</p> <br />
            <label for="chk" aria-hidden="true">User Type</label>&nbsp;&nbsp;
            <select name="utype" value={formValues.utype} onChange={handleChange}>
              <option value="-------------">Select Type Trainer/Admin  </option>
              <option value="trainer">    Trainer    </option>
              <option value="admin">Administrator</option>
            </select>
            <p className='error'>{formErrors.email}</p>
            <br />
            <button>Login</button>
          </form>
        </div>
      </div></div>




  )
}