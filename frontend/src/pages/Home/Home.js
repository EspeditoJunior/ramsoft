import React, { useState, useEffect } from 'react';
import DashBoardList from './Components/DashBoardList';
import { Container, Card } from '@mui/material';

function Home(){
    const [dashboards, setDashboards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() =>{
        fetchDashBoardsHandler()
    }, [])

    async function fetchDashBoardsHandler (){
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch('https://localhost:7111/Dashboard/list');
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
          const data = await response.json();
          const transformedDashboards = data.map((dashboard) => {
            return {
              dashBoardId: dashboard.dashBoardId,
              name: dashboard.name
            };
          });
          setDashboards(transformedDashboards);
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
    };

    function handleUpdate(dashboards){
      setDashboards(dashboards)
    };

    let content = <p>Found no dashboards</p>;

    if (dashboards.length > 0) {
        content = <DashBoardList dashboards={dashboards} onUpdate={handleUpdate} />;
    }

    if (error) {
        content = <p>Error: {error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }  


    return (
      <Container>
        <h1>Ramsoft dashboards</h1>
        <div>
          {content}
          <a href="/dashboard/create">Create new  dashboard</a>
        </div>
      </Container>
    );
}

export default Home;