import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Trainer.css';

import React, { useEffect,useState }  from 'react';
import { useParams } from 'react-router-dom';

export const ViewProfile = () => {
  //const { _id } = useParams();
  const [email, setEmail] = useState('')
  
  let _email = localStorage.getItem('email');
  useEffect(() => {
    if(_email)
      setEmail(_email)
        }, [_email])

console.log(_email);
  // Temporary storage of DB data
  const [trainer, settrainer] = useState({id:0,name:"", address:"",approved:"", company:"", qualification:"", skill: "",type:"", photo:""});


  // Backend Connection API Fetch
  useEffect(() => {
      fetchAPI();
  }, [_email]);

  async function fetchAPI() {
      const response = await fetch(`https://trainerappictak.herokuapp.com/api/viewprofile/${_email}`);
      const body = await response.json();
      settrainer(body);
  }

  const boldText = {
    fontWeight: 'bold'
}
 const atable = {
    
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    marginLeft:420
  
}
console.log(trainer.photo);

  return (
    <div><br/>     <br/><h1 className='head1'>ViewProfile</h1><br/>  
<>    

    <div className='photo'>
    <img className='image'
          src={`https://trainerappictak.herokuapp.com/static/${trainer.photo}`} alt="Please Upload Photo First" width="200px" height="200px" border = "1px solid blue"/>
    </div>

       <TableContainer className='table' style={atable}>
        <Table  sx={{ maxWidth: 650 }} >
          <TableHead>
          
            <TableRow>
              <TableCell style={boldText}>Particulars</TableCell>
              <TableCell style={boldText} align="right" >Details</TableCell>
            </TableRow>
            
          </TableHead>
          <TableBody ><TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">{trainer.id}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">{trainer.name}</TableCell>
              </TableRow>
              
              <TableRow>
              <TableCell>Address</TableCell>
              <TableCell align="right">{trainer.address}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Current Company</TableCell>
              <TableCell align="right">{trainer.company}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Qualification</TableCell>
              <TableCell align="right">{trainer.qualification}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Courses</TableCell>
              <TableCell align="right">{trainer.courses }</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Skillset</TableCell>
              <TableCell align="right">{trainer.skill}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Approval status</TableCell>
              <TableCell align="right">{trainer.approved?
              <>True</>
              :
              <>False</>
              
              }
              </TableCell>
              </TableRow>
              <TableRow className='buttona'>
              <TableCell>Trainer Type</TableCell>
              <TableCell align="right" className='trainertype'> {trainer.type}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
    </>
       <br/></div>
  )
}
