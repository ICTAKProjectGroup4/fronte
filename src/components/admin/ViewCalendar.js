import React, { useEffect,useState }  from 'react';
import './trainer.css';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { Link, Navigate } from 'react-router-dom';
import Allocate from './Allocate';
import { useNavigate } from 'react-router';
import moment from 'moment';



function Table({ columns, data }) {

    const [search, setSearch] = useState();
   
    function handleChange(event){
        const value=event.target.value;
        setSearch(value);
        console.log(search);
    }

    useEffect(() => {
        
        setGlobalFilter(search);
        console.log(search);
      }, [search]);
   
    

    const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
            state,
            setGlobalFilter,
          } = useTable(
              { 
                  columns, 
                  data 
              },
              useGlobalFilter);

              

          return (
              <>
               <input type="text" placeholder='Search...' className='search' onChange={handleChange}></input>
               <br></br>
               <br></br>
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

export const ViewCalendar = () => {
    // Temporary storage of DB data
   const [trainerappr, settrainerappr] = useState([]);

    // Backend Connection API Fetch
    useEffect(() => {
        fetchAPI();
    }, []);

    async function fetchAPI() {
        const response = await fetch(`https://trainerappictak.herokuapp.com/api/schedule`);
        const body = await response.json();
        settrainerappr(body);
    }
    
    
    const data = trainerappr;

    let navigate = useNavigate();
    
    let sDate = moment(trainerappr.startDate).format('DD/MMM/YYYY');
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
            navigate(`/allocate/${id}`)
        }
    
    return (
        <div>
         <h1 className='head1'>View Schedule  </h1> 
        <Table columns={columns} data={data} />
        <br></br>
        </div>
        );
        }
