import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect,useState }  from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import './trainer.css';
import { useNavigate } from 'react-router';



  function PendingTrainer(props) {

    const { _id } = useParams();


    // Temporary storage of DB data
    const [trainerpend, settrainerpend] = useState({id:"",name:"",email:"", address:"", company:"", qualification:"", skill: "" });


    // Backend Connection API Fetch
    useEffect(() => {
        fetchAPI();
    }, [_id]);

    async function fetchAPI() {
        const response = await fetch(`https://trainerappictak.herokuapp.com/api/pending/${_id}`);
        const body = await response.json();
        settrainerpend(body);
    }

    const boldText = {
      fontWeight: 'bold'
    }

  //Capturing value of trainer type
  const [option,setOption] = useState("");
  function handleChange(event){
    setOption(event.target.value)
  }
  console.log(option);
  console.log(trainerpend);

  let navigate = useNavigate();

  async function clicked(){
    let type = option
    let id = trainerpend.id
    let name=trainerpend.name
    let email=trainerpend.email
    if (type== "internal" || type== "empanelled" || type== "expert" ){
    await fetch(`https://trainerappictak.herokuapp.com/api/pending/${_id}/approve`, {
      method: 'post',
      body: JSON.stringify({ id,name,email,type}),
      
            headers: {
                'Content-Type': 'application/json'
            }
            });
            alert("Trainer approved")
            navigate(`/approve`)
            }
    else{
      alert("Select Trainer Type");
    }
    }

    return (
    <>
      {/* Pending for approval Trainer details */}
      <TableContainer className='table'>
        <Table sx={{ maxWidth: 650 }} >
          <TableHead>
          
            <TableRow>
              <TableCell style={boldText}>Particulars</TableCell>
              <TableCell style={boldText} align="right" >Details</TableCell>
            </TableRow>
            
          </TableHead>
          <TableBody >
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">{trainerpend.id}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">{trainerpend.name}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">{trainerpend.email}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Adress</TableCell>
              <TableCell align="right">{trainerpend.address}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align="right">{trainerpend.company}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Qualification</TableCell>
              <TableCell align="right">{trainerpend.qualification}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>Skillset</TableCell>
              <TableCell align="right">{trainerpend.skill}</TableCell>
              </TableRow>
              <TableRow className='buttona'>
              <TableCell>Trainer Type</TableCell>
              <TableCell align="right"> <select onChange={handleChange}>
                  <option value="null">Select type</option>        
                  <option value="internal">Internal</option>
                  <option value="empanelled">Empanelled</option>
                  <option value="expert">Industry Expert</option>
                  </select></TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
    <button onClick={clicked} className="button">Approve</button>
    <br></br>
    <br></br>
    </>
    );
  }

  export default PendingTrainer;