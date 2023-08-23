import {useParams} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Row from './Row';
import { Grid, Container } from '@mui/material';

function Rows(props){
    
    let content = <p>This dashboard does not contains rows or tasks</p>;

    if(props.rows != null){
        content = (
          <Container >
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>              
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                  {props.rows.map((row, index) => {
                    return (
                      <Row  key={row.id} row={row}/>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        )
    }

    return (
      <div>
        {content}
      </div>
    );
}

export default Rows;