import {useParams} from 'react-router-dom'
import React, { useState, useEffect, Fragment } from 'react';
import { Container, Card } from '@mui/material';

function Task(props){
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const buttonDeleteHandler = event => {
    console.log(props.task.taskId)
    deleteTask(props.task.taskId)
  }
  
  async function deleteTask(id){
    setIsLoading(true);
    setError(null);
    try {
        const response =  await fetch('https://localhost:7111/Task/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent' : 'ramsoftFrontEnd'
                }
            }
        );
  
        if (!response.ok) {
            const data = await response.json();
            setError(data.message);
        } else {
          window.location.reload();
        }
    } catch (error) {
        setError(error.message);
    }
    setIsLoading(false);
  }


  let content = (
    <Fragment>
      <p>{props.task.name}</p>
      <p><a href={"/dashboard/edittask/"+props.task.taskId}>Visualize/Edit/Move this task</a></p>
      <button onClick={buttonDeleteHandler}>Delete this task</button>
    </Fragment>
  )

  if (error) {
    content = <p>Error on deleting: {error}</p>;
  }

  if (isLoading) {
    content = <p>Deleting...</p>;
  }  


   return (
      <div>
        {content}
      </div>
    );
}

export default Task;