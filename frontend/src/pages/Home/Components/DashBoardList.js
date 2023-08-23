import React, { useState } from 'react';
import { Container, Card } from '@mui/material';

import DashBoard from './Dashboard';





const DashBoardList = (props) => {

  function handleDashboardUpdate(dashboards){
    props.onUpdate(dashboards)
  };

  return (
    <Container         style={{
      boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
      backgroundColor: "#fafafa",
    }}>
      {props.dashboards.map((dashboard) => (
        <DashBoard
          key={dashboard.dashBoardId}
          id={dashboard.dashBoardId}
          name={dashboard.name}
          onDashboardUpdate={handleDashboardUpdate}
        />
      ))}
    </Container>
  );
};

export default DashBoardList;
