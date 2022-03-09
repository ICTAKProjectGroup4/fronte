import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Enroll.css';
export const Enroll = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    let cemail = localStorage.getItem('email1');
    useEffect(() => {
     if(cemail)
setEmail(cemail)
    }, [cemail])
  console.log(cemail);
    const [enrollValues, setenrollValues] = useState({ name: "", address: "", approved: "false", company: "", courses: "", designation: "", email: cemail, phone: "", qualification: "", skill: "", type: "trainer" });

    //function addTrainer() { }
    async function addTrainer(event) {
        event.preventDefault();
         const name = enrollValues.name;                
         const address = enrollValues.address;
        const approved = "false";
        const company = enrollValues.company;
        const courses = enrollValues.courses;
        const designation = enrollValues.designation;
        const email= cemail;
        const phone = enrollValues.phone;
       //const photo = enrollValues.photo;
       const qualification = enrollValues.qualification;
       const skill = enrollValues.skill;
       const type = "trainer";
       const response = await fetch(`http://localhost:5000/api/enroll`, {
        //  const response = await fetch(`https://smith-blog.herokuapp.com/api/addart`, {
            method: 'post',
            body: JSON.stringify({ name,address,approved,company,courses,designation,email,phone,qualification,skill,type }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const body = await response.json();
          console.log(body);
          alert('Trainer enrollment submitted Successfullly: ');
          //setarticleValues({ name: "", title: "", description: "" });
          navigate("/success", { replace: true });

    }
    function handleChange(event) {
        event.preventDefault();
        console.log(event.target);
        const { name, value } = event.target;
        //spread syntax += action
        if (value)
          setenrollValues({ ...enrollValues, [name]: value });
    
        //rsaevent.preventDefault();
      }

return (
    <div><br />
        <h1>Enroll As Trainer</h1>
        <form>

            <table className="myTable" cellPadding={15} >
                <tbody>
                    <tr>
                     <td>Full Name </td>
                        <td> <input type="text" name="name" size={50} placeholder="NAME"  value={enrollValues.name} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>  <textarea rows="4" cols="47" name='address' value={enrollValues.address} onChange={handleChange}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Current Company</td>
                        <td><input type="text" name="company" size={50} value={enrollValues.company} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Course</td>
                        <td><select name="courses" value={enrollValues.courses} >

                            <option value="01_DSA">DATA SCIENCE & ANALYTICS</option>
                            <option value="02_FSD">FULL STACK DEVELOPMENT</option>
                            <option value="03_RPA">ROBOTIC PROCESS AUTOMATION</option>

                            <option value="04_CSA">CYBER SECURITY ANALYST</option>
                            <option value="05_DM">DIGITAL MARKETING METHODS</option>
                            <option value="06_MLAI">MACHINE LEARNING & ARTIFICIAL INTELLIGENCE</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Designation</td>
                        <td><input type="text" name="designation" size={50} value={enrollValues.designation} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td><input type="text" name="phone" size={50} value={enrollValues.phone} onChange={handleChange}  /></td>
                    </tr>

                    <tr>
                        <td>Qualification</td>
                        <td><input type="text" name="qualification" size={50} value={enrollValues.qualification} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Skills<br /><h6>comma seperated entires</h6></td>
                        <td><input type="text" name="skill" size={50} value={enrollValues.skill} onChange={handleChange}  /></td>
                    </tr>
                    <tr><td colspan="2"><br /> <button onClick={addTrainer}>Enroll As Trainer</button><br /></td></tr>
                </tbody>
            </table>
        </form>

    </div>

)}
