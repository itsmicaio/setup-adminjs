import { ApiClient } from "adminjs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

type DashboardResponse = {
  moviesCount: number;
}

export const Dashboard = () => {
  const [data, setData] = useState<DashboardResponse>({ moviesCount: 0 });
  const api = new ApiClient();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await api.getDashboard<DashboardResponse>();
    setData(response.data);
  };

  const Box = styled.div`
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    border-color: #ddd;
    max-width: 200px;
  `

  return (
    <div>
      <h1>Dashboard</h1>
      <Box>
        <h2>Filmes</h2>
        <span>{data.moviesCount}</span>
      </Box>
    </div>
  );
};

export default Dashboard;
