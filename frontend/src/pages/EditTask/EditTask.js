import React, { useState, Fragment, useEffect} from 'react';
import {useParams} from 'react-router-dom'

function EditTask(){
    const params = useParams();
    const [name, setName] = useState([]);
    const [description, setDescription] = useState([]);
    const [columnId, setColumnId] = useState([]);
    const [dashBoardId, setDashboardId] = useState(null);
    const [task, setTask] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rows, setRows] = useState([]);

    useEffect(() =>{
        fetchTask();
    }, [])


    useEffect(() =>{
        fetchRows();
    }, [dashBoardId])

    async function fetchTask (){
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch('https://localhost:7111/Task/'+params.taskId);
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
          const data = await response.json();
          setName(data.name);
          setDescription(data.description);
          setColumnId(data.columnId);
          setDashboardId(data.dashBoardId);
        } catch (error) {
          setError(error.message);
        }
    };

    async function fetchRows (){
        if(dashBoardId){  
            setIsLoading(true);
            setError(null);
            try {
              const response = await fetch('https://localhost:7111/Column/list/'+dashBoardId);
              if (!response.ok) {
                throw new Error('Something went wrong!');
              }
              const data = await response.json();
              setRows(data);
            } catch (error) {
              setError(error.message);
            }
            setIsLoading(false);  
        } 
    }

    const handleNameChange = event => {
        setName(event.target.value);
    }

    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    }

    const handleRowChange = event => {
        console.log("update column!");
        setColumnId(event.target.value);
    }

    const formSubmissionHandler = event => {
        event.preventDefault();
        putTask();
    }

    async function putTask(){
        setIsLoading(true);
        setError(null);
        try {

            console.log("update column");
            console.log(columnId);

            const response =  await fetch('https://localhost:7111/Task', {
                     method: 'PUT',
                    body: JSON.stringify(
                        {
                            "TaskId": params.taskId,
                            "Name" : name,
                            "description": description,
                            "columnId" : columnId
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
            <h1>Edit Task</h1>
            <form onSubmit={formSubmissionHandler}>
                <label>
                    Name:
                    <input maxLength="50" type="text" name="name" value={name} onChange={handleNameChange} />
                </label>
                <label>
                    Description:
                    <input maxLength="50" type="text" name="description" value={description} onChange={handleDescriptionChange} />
                </label>
                <label>
                    Row:
                    <select value={columnId} name="row" onChange={handleRowChange}>
                        {rows.map((row, index) => {
                            return (
                                <option key={row.columnId} value={row.columnId}>{row.name}</option>
                            );
                        })}
                    </select>
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

    if (task.name) {
        content = (
            <Fragment>    
                <h1>Task Updated!</h1>
                <p>Name : {task.name}</p>
                <p>Task Id : {task.taskId}</p>
                <a href={"/dashboard/"+task.dashBoardId}>Return to dashboard page</a>
            </Fragment>
        )
    }

    return (
      <div>
        {content}
      </div>
    );
}

export default EditTask;