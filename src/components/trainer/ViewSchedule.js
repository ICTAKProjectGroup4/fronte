import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect,useState }  from 'react';
// import './trainer.css';
import { useTable, useFilters, useGlobalFilter} from 'react-table';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router';
import moment from 'moment';
import "./Calendar.css";


function Table({ columns, data }) {

  const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
          state,
        } = useTable(
            { 
                columns, 
                data 
            },
            );

            

        return (
            <>
        <table {...getTableProps()} className="tablea">
        <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                <th
                {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
                </tr>
                 ))}
                 </thead>

         <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
               <tr {...row.getRowProps()}>
                 {row.cells.map(cell => {
                   return (
                       <td {...cell.getCellProps()}>
                         {cell.render('Cell')}
                       </td>
                   )
                 })}
               </tr>
           )
         })}
         </tbody>
       </table>
       </>
       )
      }

export const ViewSchedule = () => {
  //const { _id } = useParams();
  const [email, setEmail] = useState('')
  
  let _email = localStorage.getItem('email');
  useEffect(() => {
    if(_email)
      setEmail(_email)
        }, [_email])

  // Temporary storage of DB data
  const [trainer, settrainer] = useState({id:0,name:""});


  // Backend Connection API Fetch
  useEffect(() => {
      fetchAPIa();
  }, [_email]);

  async function fetchAPIa() {
      const response = await fetch(`http://localhost:5000/api/viewprofile/${_email}`);
      const body = await response.json();
      settrainer(body);
  }

// Temporary storage of DB data
const [trainerappr, settrainerappr] = useState([]);

// Backend Connection API Fetch
useEffect(() => {
    fetchAPIb();
}, [trainer.id]);

async function fetchAPIb() {
    let id = trainer.id;
    const response = await fetch(`http://localhost:5000/api/schedule/${id}`);
    const body = await response.json();
    settrainerappr(body);
}


const data = trainerappr;

let navigate = useNavigate();

const columns = React.useMemo(()=>
        [
            {
                Header: 'ID',
                accessor: 'id', // accessor is the "key" in the data
            },
        {
            Header: 'Name',
            accessor: 'name', // accessor is the "key" in the data
        },
        {
            Header: 'Course',
            accessor: 'course', 
        },
        {
            Header: 'Batch',
            accessor: 'batch', 
        },
        {
            Header: 'Start Date',
            accessor: (data) => moment(data.startDate).format("DD/MM/YYYY") 
        },
        {
            Header: 'End Date',
            accessor: (data) => moment(data.endDate).format("DD/MM/YYYY")
        },
        {
            Header: 'Start Time(24hrs)',
            accessor: 'startTime', 
        },
        {
            Header: 'End Time(24hrs)',
            accessor: 'endTime', 
        },
        {
            Header: 'Meeting Link',
            accessor: 'meeting', 
            
        },
        
    ], [] )


    function clicked(cell) {
        const id = cell.target.value;
        navigate(`/calendar/${id}`)
    }
  return (
      <>
    <div><h1>View Schedule</h1> 
    <h3>Name : {trainer.name} [ID : {trainer.id}]</h3> 
       <br/><Table columns={columns} data={data} /></div>
       <button className='button'  value= {trainer.id} onClick={clicked}> Show Calendar</button>
       <br></br>
       <br></br>
       </>
  )
}

