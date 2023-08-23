import {useParams} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Tasks from './Tasks';
import { Container, Card } from '@mui/material';

function Row(props){
   return (
      <div >
       <h3>{props.row.name}</h3>
         <Container>
            <Tasks tasks={props.row.tasks}/>
            <a href={"/dashboard/createtask/"+props.row.columnId}>Add task to this row</a>
         </Container>
      </div>
    );
}

export default Row;