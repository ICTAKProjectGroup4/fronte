import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect,useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
import { useParams } from 'react-router-dom';


const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


 
export const ShowCalendar = () => {

  const { id } = useParams();
  console.log(id);

 // Temporary storage of DB data
 const [trainerappr, settrainerappr] = useState([{id:"",batch:"", course:"",endDate:"",startDate:"", endTime:"",startTime:"",meeting:"", name: ""}]);
//  const [trainer, settrainer] = useState({id:0,name:"", address:"",approved:"",phone:"", company:"",designation:"",qualification:"", skill: "",type:"" });
// Backend Connection API Fetch
useEffect(() => {
  fetchAPIb();
}, [id]);

async function fetchAPIb() {
  const response = await fetch(`https://trainerappictak.herokuapp.com/api/schedule/${id}`);
  const body = await response.json();
  settrainerappr(body);
}

console.log(trainerappr);
console.log(trainerappr.length);
// console.log(trainerappr[0].startDate)

// let sDate = new Date (trainerappr[0].startDate);
// let eDate = new Date (trainerappr[0].endDate);

// const events = {trainerappr.map((i,key)=> ({
//   start: trainerappr[i].startDate,
  
//   )
// }
// ))
const events = [
  // {
  //     title: "Big Meeting",
  //     allDay: true,
  //     start: sDate,
  //     end: eDate,
  // },
  {
      title: "Vacation",
      start: new Date(2021, 6, 7),
      end: new Date(2021, 6, 10),
  },
  {
      title: "Conference",
      start: new Date(2021, 6, 20),
      end: new Date(2021, 6, 23),
  },
];

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }
  


  return (
    <div className="App">
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </div>
  )
}
