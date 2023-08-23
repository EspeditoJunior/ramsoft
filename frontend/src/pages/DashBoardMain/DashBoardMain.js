import {useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Rows from './components/Rows';
import { Container } from '@mui/material';

function DashBoardMain(){
    const params = useParams();
    const [dashboard, setDashboard] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() =>{
        fetchDashBoardHandler()
    }, [])

    async function fetchDashBoardHandler (){
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch('https://localhost:7111/Dashboard/'+params.dashBoardId);
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
          const data = await response.json();
          setDashboard(data);
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
    };

    let content = <p>Dashboard not found</p>;

    if (error) {
        content = <p>Error: {error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }  

    if (dashboard.name) {
        content = dashboard.name;
    }

    return (
      <Container         style={{
          boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
          backgroundColor: "#fafafa",
        }}>
        <div>
          <h1>Dashboard Name : {dashboard.name}</h1>
          <h2>Dashboard Id : {dashboard.dashBoardId}</h2>  

          <div>
            <h3>Rows</h3>
            <Container style={{
                marginBottom: "20px"
              }}>
              <a href={"/dashboard/createrow/"+dashboard.dashBoardId}>Add new rows to this dashboard</a>
            </Container>
            <Container>
              <Rows rows={dashboard.columns}/>
            </Container>          
          </div>

          <div>
            <a href="/">Return to home page</a>
          </div>

        </div>
      </Container>
    );
}

export default DashBoardMain;