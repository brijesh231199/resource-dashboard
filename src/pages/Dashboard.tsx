import { useState, useCallback } from "react";
import { Table, Button, TextInput, Group, Text, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";

import fetchData from "../api/apiClient";
import "../css/dashboard.css";
import { useAppStore } from "../store/app.store";

interface User {
  id: number;
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  skin_color: string;
  eye_color: string;
  hair_color: string;
  films: string[];
  vehicles: string[];
  starships: string[];
}

enum SortOrder {
  Ascending = "asc",
  Descending = "desc",
}

interface SortedColumnProps {
  columnName: string;
  sorted: SortOrder;
  priority: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAppStore();
  const [userList, setUserList] = useState<User[]>([]);
  const [columnSorting, setColumnSorting] = useState<SortedColumnProps[]>([]);

  // Fetch user data using react-query
  const { data: users } = useQuery(
    ["userList"],
    () => fetchData("https://swapi.dev/api/people"),
    {
      onSuccess: (data) => {
        // Assign a unique ID to each user
        const userList = data?.results?.map((user: User, index: number) => {
          return { ...user, id: index + 1 };
        });
        setUserList(userList);
      },
    }
  );

  // Handle search input change and filter the user list based on name
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let filteredUser;
    if (event?.target.value) {
      filteredUser = users?.results?.filter(
        (user: User) =>
          user.name.toLowerCase().includes(event.target.value.toLowerCase()) // Filter by name
      );
    } else {
      filteredUser = users.results;
    }
    // Apply column sorting if any sorting is set.
    if (columnSorting.length > 0) {
      filteredUser = checkColumnSorting(columnSorting, filteredUser);
    }
    setUserList(filteredUser);
  };

  // Function to apply sorting to an array of users based on the selected column and sort order.
  const applySorting = (arr: User[], column: string, sortOrder: string) => {
    if (sortOrder === SortOrder.Descending) {
      return arr?.toSorted((a: any, b: any) => b[column] - a[column]);
    } else if (sortOrder === SortOrder.Ascending) {
      return arr?.toSorted((a: any, b: any) => a[column] - b[column]);
    }
    return arr;
  };

  // Function to check and apply column sorting based on the priority and sort order of columns.
  const checkColumnSorting = (
    sortColumns: SortedColumnProps[],
    rowData: User[]
  ) => {
    // Sort columns based on priority.
    let columnPriority = sortColumns
      ?.toSorted((a, b) => b.priority - a.priority)
      ?.map((info) => ({
        columnName: info.columnName,
        sorted: info.sorted,
      }));
    let data = [...rowData];

    // Apply sorting for each column in priority order.
    columnPriority?.forEach((column) => {
      data = applySorting(data, column.columnName, column.sorted);
    });
    return data;
  };

  // Function to handle column sorting when a user clicks on a column header.
  const onColumnSorting = (columnName: string) => {
    // Check if the column is already being sorted.
    const sortingType = columnSorting?.find(
      (column) => column.columnName === columnName
    );
    let columnSort: SortedColumnProps[];
    if (sortingType?.sorted === SortOrder.Descending) {
      // Remove the column from sorting state and adjust priorities.
      columnSort = columnSorting
        ?.filter((column) => column.columnName !== columnName)
        ?.map((column, index) => ({
          ...column,
          priority: index + 1, // Reassign priorities sequentially
        }));
    } else if (sortingType?.sorted === SortOrder.Ascending) {
      // Toggle to descending order
      columnSort = columnSorting?.map((column) =>
        column.columnName === columnName
          ? {
              ...column,
              sorted: SortOrder.Descending,
            }
          : column
      );
    } else {
      // Add a new column with ascending order and set priority
      columnSort = [
        ...columnSorting,
        {
          columnName: columnName,
          sorted: SortOrder.Ascending,
          priority: columnSorting?.length + 1,
        },
      ];
    }
    // Apply sorting based on updated column sort.
    const userData = checkColumnSorting(columnSort, userList);
    setUserList(userData);
    setColumnSorting(columnSort);
  };

  // Function to display the correct sorting icon for a column
  const showSortIcon = useCallback(
    (columnName: string) => {
      const sortType = columnSorting?.find(
        (column) => column.columnName === columnName
      )?.sorted;
      if (!sortType) {
        return <TiArrowUnsorted className="sort-icon" />;
      } else if (sortType === SortOrder.Ascending) {
        return <TiArrowSortedUp className="sort-icon" />;
      } else {
        return <TiArrowSortedDown className="sort-icon" />;
      }
    },
    [columnSorting]
  );

  // Handle clicking on "Review" button to navigate to User Details page
  const handleReviewClick = (id: number) => {
    navigate(`/user/${id}`); // Redirect to details page
  };

  // Handle logout action
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ margin: "20px" }}>
      <Flex justify="space-between" align="center" mb={20}>
        <TextInput
          label="Name"
          placeholder="Search by name"
          mb={20}
          sx={{ width: "250px" }}
          onChange={handleInputChange}
        />
        <Button color="red" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
      <Table striped highlightOnHover withBorder>
        <thead>
          <tr>
            <th>Name</th>
            <th
              id="height_column"
              className="sortable-column"
              onClick={() => onColumnSorting("height")}
            >
              <Group className="sortable-group">
                <Text weight={600} fz="sm">
                  Height
                </Text>
                {showSortIcon("height")}
              </Group>
            </th>
            <th
              id="mass_column"
              className="sortable-column"
              onClick={() => onColumnSorting("mass")}
            >
              <Group className="sortable-group">
                <Text weight={600} fz="sm">
                  Mass
                </Text>
                {showSortIcon("mass")}
              </Group>
            </th>
            <th>Birth Year</th>
            <th>Gender</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((user: User) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.height}</td>
              <td>{user.mass}</td>
              <td>{user.birth_year}</td>
              <td>{user.gender}</td>
              <td>
                <Button size="xs" onClick={() => handleReviewClick(user.id)}>
                  Review
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
