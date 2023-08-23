import React, { useState } from 'react';

const DashBoard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const buttonDeleteHandler = event => {
    deleteDashboard(props.id)
  }

  async function deleteDashboard(id){
    setIsLoading(true);
    setError(null);
    try {
        const response =  await fetch('https://localhost:7111/Dashboard/'+id, {
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

          const responseGet =  await fetch('https://localhost:7111/Dashboard/list', {
                  headers: {
                      'Content-Type': 'application/json',
                      'User-Agent' : 'ramsoftFrontEnd'
                  }
              }
          );
          
          const dataGet = await responseGet.json();
          if (!responseGet.ok) {
            setError(dataGet.message);
          } else {
            props.onDashboardUpdate(dataGet);
          }

        }
    } catch (error) {
        setError(error.message);
    }
    setIsLoading(false);
  }

  let message = <div></div>

  if (error) {
    message = <p>Error on deleting: {error}</p>;
  }

  if (isLoading) {
    message = <p>Deleting...</p>;
  }  

  return (
    <div>
      <h2>Dashboard ID: {props.id}</h2>
      <h2>Dashboard Name: {props.name}</h2>
      <a href={"/dashboard/"+props.id}>Go to this dashboard</a>
      <div><button onClick={buttonDeleteHandler}>Delete this dashboard</button></div>
      <h2>--</h2>
      {message}
    </div>
  );
};

export default DashBoard;
