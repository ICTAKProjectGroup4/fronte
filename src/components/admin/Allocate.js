import React, { useEffect,useState }  from 'react';
import "./Allocate.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/entry.nostyle';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import TimePicker from 'react-time-picker';
import { useNavigate } from 'react-router';


function Allocate() {

    const { id } = useParams();

     // Temporary storage of DB data
     const [trainer, setTrainer] = useState({id:"",name:"", email:"",type:"", skill:"", qualification:"" });

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    // console.log(moment(startDate).format('DD/MMM/YYYY'));

    //Capturing value of course type
    const [course,setCourse] = useState("");
    function handleCourseChange(event){
    setCourse(event.target.value)
    }

     //Capturing value of course type
     const [batch,setBatch] = useState("");
     function handleBatchChange(event){
     setBatch(event.target.value)
     }

     //Capturing value of course type
    const [meeting,setMeeting] = useState("");
    function handleLinkChange(event) {
    const { value } = event.target;
    setMeeting(value);
    }

    // Capturing time
    function handleStartTimeChange(event){
        setStartTime(event.target.value);
    }

    function handleEndTimeChange(event){
        setEndTime(event.target.value);
    }

    //manage errors
    const [formErrors, setFormErrors] = useState({})
    //flag for successuful submit
    const [isSubmit, setIsSubmit] = useState(false);

    

    

     async function fetchAPI() {
        const response = await fetch(`https://trainerappictak.herokuapp.com/api/search/${id}`);
        const body = await response.json();
        setTrainer(...body);
    }

    // Backend Connection API Fetch
    useEffect(() => {
        fetchAPI();
    }, [id]);

    let navigate = useNavigate();

    //Click function
    async function clicked(e){
        e.preventDefault();
         e.target.reset();
        let id = trainer.id;
        let name= trainer.name;
        let email = trainer.email;
        
        // if (type== "internal" || type== "empanelled" || type== "expert" ){
        const response =await fetch(`https://trainerappictak.herokuapp.com/api/schedule/${id}`, {
          method: 'post',
          body: JSON.stringify({ id,name,email,course,batch,startDate,endDate,meeting,startTime,endTime}),
                headers: {
                    'Content-Type': 'application/json'
                }
                
                })
                console.log(response.status)
            //     .then(function(response) {
            //         console.log(response);
                    if(response.status == 409){
                        alert('Error : Dates Overlap');
                        console.log(response);
                        navigate('/search');
                        
                    }
                    else if (response.status === 200) {
                        alert('Trainer Allocated Successfully');
                        navigate('/schedule');
             }
            
            //     })
                // if (response) {
                //     alert('Error : Dates Overlap ');
                //     // navigate("/schedule");
                //   }
                //   else {
                //     alert('error... ');
                //   }
        }
        
    return (
        <>
        <h1 className='head1'>Trainer Allocation</h1>
        <br></br>
     <div className="allocation form">
         <form onSubmit={clicked}>
            <label for="chk" aria-hidden="true">ID: </label>
            <input defaultValue={trainer.id} className="option" disabled="true"/>
            <br/>
            <br></br>
            <label for="chk" aria-hidden="true">Knowledge Officer: </label>
            <input name="officer" defaultValue={trainer.name} className="option" disabled="true"/>
            <br/>
            <br></br>
            <label for="chk" aria-hidden="true">Email: </label>
            <input defaultValue={trainer.email} className="option" disabled="true"/>
            <br/>
            <br></br>
            <label for="chk" aria-hidden="true">Trainer Type: </label>
            <input name="type" defaultValue={trainer.type} className="type" disabled="true"/>
            <br/>
            <br></br>
            <label for="chk" aria-hidden="true">Skill: </label>
            <input name="skill" defaultValue={trainer.skill} className="skill" disabled="true"/>
            <br/>
            <br></br>
            <label for="chk" aria-hidden="true">Qualification: </label>
            <input name="qualification" defaultValue={trainer.qualification} className="option" disabled="true"/>
            <br/>
            <br></br>
            <label for="chk" aria-hidden="true">Course Id: </label>
            <div className="option">
             <td><select className="option" name="courses" onChange={handleCourseChange}>
                                <option value="--select--">select</option>
                                <option value="Data Science & Analytics">01_DSA</option>
                                <option value="Full Stack Developer">02_FSD</option>
                                <option value="Robotic Process Automation">03_RPA</option>
            </select>
           
            </td>
            </div>
            <br/>
            <br/>
            <label for="chk" aria-hidden="true">Course Name: </label>
            <input type="text" defaultValue={course} className="skill" disabled="true" required/>
            <br/>
            <br/>
            <label for="chk" aria-hidden="true">Batch Id: </label>
            <div className="option">
            <td><select  className="option" name="courses" onChange={handleBatchChange} required>
                                <option value="--select--">select</option>
                                <option value="DSA001">DSA001</option>
                                <option value="DSA002">DSA002</option>
                                <option value="FSD001">FSD001</option>
                                <option value="RPA001">RPA001</option>
            </select>
            </td>
            </div>
            <br/>
            
  
            <br></br>
            Start Date: 
            <DatePicker className="option"  selected={startDate} onChange={(date) => setStartDate(date)} />
            <br></br>
            End Date:
            <DatePicker className="option" selected={endDate} onChange={(date) => setEndDate(date)}/>
            <br></br>
            <br></br>
            Start Time (24hrs format):
            <br></br>
            <input className="option" type="time" min="09:00" max="18:00"  onChange={handleStartTimeChange}></input>
            <br></br>
            End Time (24hrs format):
            <br></br>
            <input className="option" type="time" min="09:01" max="18:00"  onChange={handleEndTimeChange}></input>
             <br></br>
            <br></br>
            {/* <Calendar onChange={onChange} value={value} /> */}
            <label for="chk" aria-hidden="true">Meeting Link/Venue: </label>
            <input name="link" placeholder="link" onChange={handleLinkChange} className="option" required/>
            <br/>
            <br></br>
            {/* <label for="chk" aria-hidden="true">Schedule: </label>
            <input type="file" name="course" placeholder="course" required="" className="option"/>
            <br/> */}
            
            <button  className="button">Allocate</button>
         </form>
         <br></br>  
     </div>   
     </>
);
}

export default Allocate