import {useParams} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Task from './Task';
import { Container, Card } from '@mui/material';

function Tasks(props){
    let content = (
      <p>This row does not contains tasks</p>
    );


    if(props.tasks != null && props.tasks.length > 0){
        content = (
          <Container>
            {props.tasks.map((task, index) => {
            return (
                <Task key={task.id} task={task}/>
              );
            })}
          </Container>
        )
    }

    return (
      <div>
        {content}
      </div>
    );
}

export default Tasks;