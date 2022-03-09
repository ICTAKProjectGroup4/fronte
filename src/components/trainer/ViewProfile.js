import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
  const [trainer, settrainer] = useState({id:0,name:"", address:"",approved:"", company:"", qualification:"", skill: "",type:"" });


  // Backend Connection API Fetch
  useEffect(() => {
      fetchAPI();
  }, [_email]);

  async function fetchAPI() {
      const response = await fetch(`http://localhost:5000/api/viewprofile/${_email}`);
      const body = await response.json();
      settrainer(body);
  }

  const boldText = {
    fontWeight: 'bold'
}
 const atable = {
 width: 500,
    height: 500,
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    marginLeft:420
  
}


  return (
    <div><br/>     <br/><h1>ViewProfile</h1><br/>  
<>     <TableContainer style={atable}>
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
              <TableCell align="right"> {trainer.type}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
    </>
       <br/></div>
  )
}
