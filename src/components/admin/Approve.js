import React, { useEffect,useState }  from 'react';
import { Link } from 'react-router-dom';

export const Approve = () => {

    // Temporary storage of DB data
    const [trainerpend, settrainerpend] = useState([]);

    // Backend Connection API Fetch
    useEffect(() => {
        fetchAPI();
    }, []);

    async function fetchAPI() {
        const response = await fetch(`http://localhost:5000/api/pending`);
        const body = await response.json();
        settrainerpend(body);
    }


    return (
        <div>
             <div> <br/> <h1>Trainer List Pending for Approval</h1>   <br/>         </div>
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
    );
}
