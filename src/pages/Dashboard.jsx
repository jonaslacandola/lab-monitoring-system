import styled from "styled-components";
import { format } from "date-fns";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";

import MiniSpinner from "../ui/MiniSpinner";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";

import { useAttendancesByCurrentDate } from "../features/attendances/useAttendancesByCurrentDate";
import SearchBar from "../ui/Searchbar";
import { useUpdateTimeOut } from "../features/attendances/useUpdateTimeOut";
import toast from "react-hot-toast";
import Time from "../features/Dashboard/Time";
import TableBody from "../features/Dashboard/TableBody";
import TableRow from "../features/Dashboard/TableRow";

const Table = styled.div`
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  border: 1px solid var(--slate-200);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  & h2 {
    color: var(--slate-700);
    font-weight: 600;
    font-size: 22px;
  }
`;

const DateAndTime = styled.span`
  font-size: 14px;
  color: var(--slate-600);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  & p {
    margin-top: 1rem;
    color: var(--slate-500);
  }
`;

const TableButton = styled(Button)`
  padding: 4px 10px;
  & span {
    font-size: 14px;
  }
`;

const GraphContainer = styled.div`
  background-color: white;
  border: 1px solid var(--slate-200);
  border-radius: 8px;
  padding: 1rem 2rem;
`;

const Title = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin: 0.2rem 0 1rem 0;
`;

const attendanceData = [
  {
    week: "Week 1",
    Cisco: 305,
    Red: 254,
    Mac: 154,
  },
  {
    week: "Week 2",
    Cisco: 325,
    Red: 154,
    Mac: 304,
  },
  {
    week: "Week 3",
    Cisco: 200,
    Red: 100,
    Mac: 167,
  },
  {
    week: "Week 4",
    Cisco: 312,
    Red: 200,
    Mac: 100,
  },
];

function Dashboard() {
  const [filter, setFilter] = useState("");
  const [filteredAttendances, setFilteredAttendances] = useState([]);
  const { currentAttendances, isLoadingCurrentAttendances } =
    useAttendancesByCurrentDate();
  const { isUpdating, timeOut } = useUpdateTimeOut();

  const currentDate = format(new Date(), "yyyy-MM-dd").replaceAll("-", "/");

  function handleTimeOutAll() {
    const dateAndTime = new Date();
    const currentTime = `${dateAndTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${dateAndTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const timedOutAttendance = filteredAttendances
      .filter((attendance) => attendance.timeOut === null)
      .map((attendance) => ({
        attendanceId: attendance.attendanceId,
        studentId: attendance.studentId,
        laboratoryId: attendance.laboratoryId,
        computerId: attendance.computerId,
        timeIn: attendance.timeIn,
        timeOut: currentTime,
        createdAt: attendance.createdAt,
      }));

    if (!timedOutAttendance.length) {
      toast.error("All attendances are timed out.");
      return;
    }

    timeOut({ timedOutAttendance, currentDate });
    setFilter("");
    setFilteredAttendances([]);
  }

  function handleFilterChanged() {
    setFilteredAttendances(
      currentAttendances.filter((attendance) =>
        attendance.laboratories?.laboratoryName.startsWith(filter)
      )
    );
  }

  function handleQueryChanged(e) {
    const { value: query } = e.target;

    if (!query) {
      setFilter("");
      setFilteredAttendances([]);
      return;
    }

    setFilter(query);
  }

  return (
    <>
      <h1>Dashboard</h1>
      {isUpdating && <Spinner />}
      <Table>
        <Header>
          <h2>Today</h2>
          <Container>
            <Container>
              <DateAndTime>{currentDate}</DateAndTime>
              <Time />
            </Container>
            <SearchBar
              value={filter}
              onChange={handleQueryChanged}
              onQuery={handleFilterChanged}
              size={"small"}
              placeholder={"Filter attendance"}
            />
            <TableButton
              onClick={handleTimeOutAll}
              disabled={!filteredAttendances.length}
            >
              <span>Time out</span>
            </TableButton>
          </Container>
        </Header>

        {isLoadingCurrentAttendances && (
          <Container>
            <MiniSpinner />
          </Container>
        )}

        {!isLoadingCurrentAttendances && (
          <TableBody
            data={
              filteredAttendances.length
                ? filteredAttendances
                : currentAttendances
            }
            render={(attendance) => (
              <TableRow key={attendance.attendanceId} attendance={attendance} />
            )}
          />
        )}
      </Table>
      <GraphContainer>
        <Title>Weekly attendance</Title>
        <ResponsiveContainer
          width="100%"
          height={350}
          style={{
            fontSize: "15px",
          }}
        >
          <LineChart data={attendanceData}>
            <XAxis dataKey={"week"} />
            <YAxis />
            <Tooltip
              contentStyle={{ borderRadius: "4px", padding: "0.5rem 1rem" }}
            />
            <Legend />
            <CartesianGrid stroke="var(--slate-300)" strokeDasharray={"5 5"} />
            <Line type="monotone" dataKey="Cisco" stroke="var(--blue-600)" />
            <Line type="monotone" dataKey="Red" stroke="var(--red-600)" />
            <Line type="monotone" dataKey="Mac" stroke="var(--lime-600)" />
          </LineChart>
        </ResponsiveContainer>
      </GraphContainer>
    </>
  );
}

export default Dashboard;
