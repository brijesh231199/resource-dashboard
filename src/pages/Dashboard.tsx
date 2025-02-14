import { useState, useEffect } from "react";
import { Button, Card, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAppStore } from "../store/app.store";
import fetchData from "../api/apiClient";

const Dashboard = () => {
  const { user, logout } = useAppStore();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  useQuery(["people"], () => fetchData("https://swapi.dev/api/people"), {
    onSuccess: (data) => setUserList(data.results),
  });

  useEffect(() => {
    console.log({ userList });
  }, [userList]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Birth Year</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user: any, index: number) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.height}</td>
            <td>{user.mass}</td>
            <td>{user.birth_year}</td>
            <td>{user.gender}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Dashboard;
