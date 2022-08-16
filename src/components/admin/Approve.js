import React, { useEffect,useState }  from 'react';
import { Link } from 'react-router-dom';
import './trainer.css';
import { useNavigate } from 'react-router';

export const Approve = () => {

    // Temporary storage of DB data
    const [trainerpend, settrainerpend] = useState([]);

    // Backend Connection API Fetch
    useEffect(() => {
        fetchAPI();
    }, []);

    async function fetchAPI() {
        const response = await fetch(`https://trainerappictak.herokuapp.com/api/pending`);
        const body = await response.json();
        settrainerpend(body);
    }
    console.log(trainerpend.length);
    let navigate = useNavigate();
    if (trainerpend.length !=0){
    return (
        <div>
             <div> <br/> <h1 className='head1'>Trainer List Pending for Approval</h1>   <br/>         </div>
            
            {trainerpend.map((i, key) => (    
                <>
                
                <Link className='user' key={key} to={`/pending/${i._id}`}>
                    <h2 className='trainerpend_head'>{i.name}</h2>
                    <br/> 
                </Link>
                    </>
            )
            )
            
            } 
           

        </div>
    );}

    else {
        return (
        <div> <br/> <h1 className='head1'>Trainer List Pending for Approval</h1>   <br/>         
        <h2>There are currently no pending trainers for approval</h2>
        <br/>
        <br/>
        </div>
        )
    }
}
