import React, { useEffect,useState }  from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const EditProfile = () => {
  //const { _id } = useParams();
  const [email, setEmail] = useState('')
  
  let _email = localStorage.getItem('email');
  useEffect(() => {
    if(_email)
      setEmail(_email)
        }, [_email])

console.log(_email);
  // Temporary storage of DB data
  const [trainer, settrainer] = useState({id:0,name:"", address:"",approved:"",phone:"", company:"",designation:"",qualification:"", skill: "",type:"" });
//Photo upload
const [trainerPhoto, setTrainerPhoto] = useState({file:[]});

  // Backend Connection API Fetch
  useEffect(() => {
      fetchAPI();
  }, [_email]);

  async function fetchAPI() {
      const response = await fetch(`http://localhost:5000/api/viewprofile/${_email}`);
      const body = await response.json();
      settrainer(body);
  }
//update trainer 
  const [uptrainerData, setuptrainerData] = useState({id:0,name:"", address:"",approved:"",phone:"", company:"",designation:"",qualification:"", skill: "",type:"" });
  const tid = trainer.id;
//handlechange
function handleChange(event){
  event.preventDefault();
  console.log(event.target);
  const {name,value}=event.target;
  //spread syntax += action
  if(value)
  settrainer({...trainer,[name]:value});
  }

  //handle image upload
  const id = trainer.id;
  const handleImageUpload = (event) => {
    setTrainerPhoto({
        ...trainerPhoto,
        file:event.target.files[0],
      });
    }

    const [isSucces, setSuccess] = useState(null);
    const submit = async () =>{
        const formdata = new FormData(); 
        formdata.append('photo', trainerPhoto.file);
        axios.post(`http://localhost:5000/api/photo/${id}`, formdata,{   
            headers: { "Content-Type": "multipart/form-data" } 
    })
    .then(res => { // then print response status
      console.warn(res);
      if(res.data.success === 1){
        setSuccess("Image upload successfully");
      }

    })
  }


//edit
async function editTrainer(event){
  alert( trainer.id);
  event.preventDefault();
  const id = trainer.id; 
                          const name = trainer.name;                
   const address = trainer.address;
 const company = trainer.company;
  const courses = trainer.courses;
  const designation = trainer.designation;
 // const email= cemail;
  const phone = trainer.phone;
 //const photo = enrollValues.photo;
 const qualification = trainer.qualification;
 const skill = trainer.skill;
  const response = await fetch(`http://localhost:5000/api/editprofile/${id}/`, {
      method: 'post',
   //   body: JSON.stringify({ name,title,description,user,upvotes,username, text }),
   body: JSON.stringify({ name,address,company,courses,designation,phone,qualification,skill}),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  const body = await response.json();
  //setarticleData(body);
//  setCommentValues(body);
console.log("nbody",body)
setuptrainerData(body);

alert(" Trainer profile updated successfully");
// const handleOnClick = () => history.push('/article-list');




}
  return (
    <div>  <br/><h1>Edit Profile & Upload Photo</h1><br/>  
    
<> <form>

<table className="myTable" cellPadding={15} >
    <tbody>
<tr>
         <th>Particulars </th>
            <th> Description</th>
        </tr>
<tr>
         <td>Trainer Id </td>
            <td> {trainer.id}</td>
        </tr>

<tr>
         <td>Trainer type </td>
            <td> {trainer.type}</td>
        </tr>
<tr>
         <td>Approval status </td>
            <td> {trainer.approved?
  <>True</>
  :
  <>False</>
  
  }</td>
        </tr>


        <tr>
         <td>Full Name </td>
            <td> <input type="text" name="name" size={50} placeholder="NAME"  value={trainer.name} onChange={handleChange}/></td>
        </tr>
        <tr>
            <td>Address</td>
            <td>  <textarea rows="4" cols="47" name='address' value={trainer.address} onChange={handleChange}></textarea>
            </td>
        </tr>
        <tr>
            <td>Current Company</td>
            <td><input type="text" name="company" size={50} value={trainer.company} onChange={handleChange} /></td>
        </tr>
        <tr>
            <td>Course</td>
            <td><select name="courses" value={trainer.courses} >

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
            <td><input type="text" name="designation" size={50} value={trainer.designation} onChange={handleChange} /></td>
        </tr>
        <tr>
            <td>Phone</td>
            <td><input type="text" name="phone" size={50} value={trainer.phone} onChange={handleChange}  /></td>
        </tr>

        <tr>
            <td>Qualification</td>
            <td><input type="text" name="qualification" size={50} value={trainer.qualification} onChange={handleChange} /></td>
        </tr>
        <tr>
            <td>Skills<br /><h6>comma seperated entires</h6></td>
            <td><input type="text" name="skill" size={50} value={trainer.skill} onChange={handleChange}  /></td>
        </tr>
        <tr><td colspan="2"><br /> <button onClick={editTrainer}>Edit Trainer Profile</button><br /></td></tr>
    </tbody>
</table>
</form>
    <div>
    <h2>Upload Image
    <div className="formdesign">
      {isSucces !== null ? <h4> {isSucces} </h4> :null }
        <div className="form-row">
          <label className="text-white">Select Image :</label>
          <input type="file" className="form-control" name="upload_file"  onChange={handleImageUpload} />
        </div>

        <div className="form-row">
          <button type="submit" className="btn btn-dark" onClick={()=>submit()} > Save </button>
          
        </div>
      </div>
    </h2>
    </div>

    </>
       <br/></div>

       
  )
}