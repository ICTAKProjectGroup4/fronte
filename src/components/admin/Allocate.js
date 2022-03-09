import React, { useEffect,useState }  from 'react';
import "./Allocate.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/entry.nostyle';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import TimePicker from 'react-time-picker';


function Allocate() {

    const { id } = useParams();

     // Temporary storage of DB data
     const [trainer, setTrainer] = useState({id:"",name:"", email:"",type:"", skill:"", qualification:"" });

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState('10:00');
    const [endTime, setEndTime] = useState('15:00');

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

    // Backend Connection API Fetch
    useEffect(() => {
        fetchAPI();
    }, [id]);

     async function fetchAPI() {
        const response = await fetch(`http://localhost:5000/api/search/${id}`);
        const body = await response.json();
        setTrainer(...body);
    }

    //Click function
    async function clicked(){
        
        let id = trainer.id;
        let name= trainer.name;
        let email = trainer.email;
        // if (type== "internal" || type== "empanelled" || type== "expert" ){
        const response =await fetch(`http://localhost:5000/api/schedule/${id}`, {
          method: 'post',
          body: JSON.stringify({ id,name,email,course,batch,startDate,endDate,meeting,startTime,endTime}),
                headers: {
                    'Content-Type': 'application/json'
                }
        
                }).then(function(response) {
                    alert(response.status);
                })
        }

    return (
     <div className="allocation form">
         <form>
            <h1> Trainer Allocation</h1>
             
            <label for="chk" aria-hidden="true">ID: </label>
            <input defaultValue={trainer.id} className="option" disabled="true"/>
            <br/>
            <label for="chk" aria-hidden="true">Knowledge Officer: </label>
            <input name="officer" defaultValue={trainer.name} className="option" disabled="true"/>
            <br/>
            <label for="chk" aria-hidden="true">Email: </label>
            <input defaultValue={trainer.email} className="option" disabled="true"/>
            <br/>
            <label for="chk" aria-hidden="true">Trainer Type: </label>
            <input name="type" defaultValue={trainer.type} className="type" disabled="true"/>
            <br/>
            <label for="chk" aria-hidden="true">Skill: </label>
            <input name="skill" defaultValue={trainer.skill} className="skill" disabled="true"/>
            <br/>
            <label for="chk" aria-hidden="true">Qualification: </label>
            <input name="qualification" defaultValue={trainer.qualification} className="option" disabled="true"/>
            <br/>
            
            <label for="chk" aria-hidden="true">Course Id: </label>
            <div className="option">
             <td><select  name="courses" onChange={handleCourseChange}>
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
            <input type="text" defaultValue={course} className="skill" disabled="true"/>
            <br/>
            <br/>
            <label for="chk" aria-hidden="true">Batch Id: </label>
            <div className="option">
            <td><select  name="courses" onChange={handleBatchChange} >
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
            <DatePicker classname="datepicker" selected={startDate} onChange={(date) => setStartDate(date)}/>
            <br></br>
            <br></br>
            End Date:
            <DatePicker classname="datepicker" selected={endDate} onChange={(date) => setEndDate(date)}/>
            <br></br>
            <br></br>
            Start Time (24hrs format):
            <br></br>
            <input type="time" min="09:00" max="18:00"  onChange={handleStartTimeChange}></input>
             <br></br>
            <br></br>
            End Time (24hrs format):
            <br></br>
            <input type="time" min="09:00" max="18:00"  onChange={handleEndTimeChange}></input>
             <br></br>
            <br></br>
            {/* <Calendar onChange={onChange} value={value} /> */}
            <label for="chk" aria-hidden="true">Meeting Link/Venue: </label>
            <input name="link" placeholder="link" onChange={handleLinkChange} className="meeting"/>
            <br/>
            <br></br>
            <label for="chk" aria-hidden="true">Schedule: </label>
            <input type="file" name="course" placeholder="course" required="" className="option"/>
            <br/>
            
            <button onClick={clicked} className="button">Allocate</button>

         </form>

     </div>   
        
);
}

export default Allocate