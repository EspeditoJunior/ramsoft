import React, { useState, Fragment} from 'react';
import {useParams} from 'react-router-dom'

function CreateTask(){
    const params = useParams();
    const [name, setName] = useState([]);
    const [description, setDescription] = useState([]);
    const [Task, setTask] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleNameChange = event => {
        setName(event.target.value);
    }

    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    }

    const formSubmissionHandler = event => {
        event.preventDefault();
        postTask();
    }

    async function postTask(){
        setIsLoading(true);
        setError(null);
        try {
            const response =  await fetch('https://localhost:7111/Task', {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            "ColumnId": params.rowId , 
                            "Name" : name,
                            "description": description
                        }),
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
                setTask(data);
            }
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    let content = (
        <Fragment>    
            <h1>Create Task</h1>
            <form onSubmit={formSubmissionHandler}>
                <label>
                    Name:
                    <input maxLength="50" type="text" name="name" value={name} onChange={handleNameChange} />
                </label>
                <label>
                    Description:
                    <input maxLength="50" type="text" name="description" value={description} onChange={handleDescriptionChange} />
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

    if (Task.name) {
        content = (
            <Fragment>    
                <h1>Task Created!</h1>
                <p>Name : {Task.name}</p>
                <p>Task Id : {Task.taskId}</p>
                <a href={"/dashboard/"+Task.dashBoardId}>Return to dashboard page</a>
            </Fragment>
        )
    }

    return (
      <div>
        {content}
      </div>
    );
}

export default CreateTask;