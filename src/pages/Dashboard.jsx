import styled from "styled-components";
import { formatTime } from "../data/formatTime";
import { format } from "date-fns";

import MiniSpinner from "../ui/MiniSpinner";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";

import { useAttendancesByCurrentDate } from "../features/attendances/useAttendancesByCurrentDate";
import { useEffect, useState } from "react";
import { useUpdateTimeOutAll } from "../features/attendances/useUpdateTimeOutAll";
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

const Body = styled.div`
  padding: 10px 0;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  & p {
    margin-top: 1rem;
    color: var(--slate-500);
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.8fr 0.6fr 0.6fr 0.5fr 0.5fr;
  padding: 8px;
  font-size: 15px;

  & span {
    color: var(--slate-700);
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
  const currentDate = format(new Date(), "yyyy-MM-dd").replaceAll("-", "/");
  const { isUpdating, updateTimeOut } = useUpdateTimeOutAll();
  const { currentAttendances, isLoadingCurrentAttendances } =
    useAttendancesByCurrentDate();

  function handleTimeOutAll() {
    const dateAndTime = new Date();
    const currentTime = `${dateAndTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${dateAndTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    updateTimeOut({ currentTime, currentDate });
  }

  return (
    <>
      <h1>Dashboard</h1>
      {isUpdating && <Spinner />}
      <Table>
        <Header>
          <h2>Today</h2>
          <Container>
            <DateAndTime>{currentDate}</DateAndTime>
            <Time />
          </Container>

          <TableButton onClick={handleTimeOutAll}>
            <span>Time out</span>
          </TableButton>
        </Header>

        {isLoadingCurrentAttendances && (
          <Container>
            <MiniSpinner />
          </Container>
        )}
        {Boolean(!currentAttendances?.length) && (
          <Container>
            <p>There are no attendances today.</p>
          </Container>
        )}
        <Body>
          {!isLoadingCurrentAttendances &&
            Boolean(currentAttendances?.length) &&
            currentAttendances?.map((attendance) => (
              <TableRow key={attendance.attendanceId} attendance={attendance} />
            ))}
        </Body>
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

function TableRow({ attendance }) {
  const { students, computers, laboratories, timeIn, timeOut } = attendance;
  const { studentId, studentName, yearAndSection } = students;
  const { computer } = computers;
  const { laboratoryName } = laboratories;

  return (
    <Row>
      <span>{studentId}</span>
      <span>{studentName}</span>
      <span>{yearAndSection}</span>
      <span>{laboratoryName}</span>
      <span>{computer}</span>
      <span>{formatTime(timeIn)}</span>
      <span>{timeOut ? formatTime(timeOut) : "--:-- --"}</span>
    </Row>
  );
}

function Time() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(function () {
    const intervalTime = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => clearInterval(intervalTime);
  }, []);

  return <DateAndTime>{formatTime(currentTime.toTimeString())}</DateAndTime>;
}
export default Dashboard;
