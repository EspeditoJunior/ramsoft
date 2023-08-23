import React, { useState, Fragment} from 'react';
import {useParams} from 'react-router-dom'

function CreateRow(){
    const params = useParams();
    const [name, setName] = useState([]);
    const [row, setRow] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleNameChange = event => {
        setName(event.target.value);
    }

    const formSubmissionHandler = event => {
        event.preventDefault();
        postRow();
    }

    async function postRow(){
        setIsLoading(true);
        setError(null);
        try {
            const response =  await fetch('https://localhost:7111/Column', {
                    method: 'POST',
                    body: JSON.stringify({"Name": name, "DashBoardId" : params.dashBoardId}),
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent' : 'ramsoftFrontEnd'
                    }
                }
            );
            const data = await response.json();
            if (!response.ok) {
                setError(data.message);
            } else {
                setRow(data);
            }
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    let content = (
        <Fragment>    
            <h1>Create Row</h1>
            <form onSubmit={formSubmissionHandler}>
                <label>
                    Name:
                    <input maxLength="50" type="text" name="name" value={name} onChange={handleNameChange} />
                </label>
                <input maxLength="50" type="submit" value="Submit" />
            </form>
        </Fragment>
    )  

    if (error) {
        content = <p>Error: {error}</p>;
    }

    if (isLoading) {
        content = <p>Creating...</p>;
    }  

    if (row.name) {
        content = (
            <Fragment>    
                <h1>Row Created!</h1>
                <p>Name : {row.name}</p>
                <p>Row Id : {row.columnId}</p>
                <a href={"/dashboard/"+row.dashBoardId}>Return to dashboard page</a>
            </Fragment>
        )
    }

    return (
      <div>
        {content}
      </div>
    );
}

export default CreateRow;