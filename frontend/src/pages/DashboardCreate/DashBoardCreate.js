import React, { useState, Fragment } from 'react';

function DashBoardCreate(){
    const [name, setName] = useState([]);
    const [dashboard, setDashboard] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleNameChange = event => {
        setName(event.target.value);
    }

    const formSubmissionHandler = event => {
        event.preventDefault();
        postDashboard();
    }

    async function postDashboard(){
        setIsLoading(true);
        setError(null);
        try {
            const response =  await fetch('https://localhost:7111/Dashboard', {
                    method: 'POST',
                    body: JSON.stringify({"Name": name}),
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
                setDashboard(data);
            }
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    let content = (
        <Fragment>    
            <h1>Create Dashboard</h1>
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

    if (dashboard.name) {
        content = (
            <Fragment>    
                <h1>Dashboard Created!</h1>
                <p>Name : {dashboard.name}</p>
                <p>Id : {dashboard.dashBoardId}</p>
                <a href="/">Return to main page</a>
            </Fragment>
        )
    }

    return (
      <div>
        {content}
      </div>
    );
}

export default DashBoardCreate;