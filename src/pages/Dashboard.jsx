import styled from "styled-components";
import { formatTime } from "../data/formatTime";
import { format } from "date-fns";

import MiniSpinner from "../ui/MiniSpinner";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";

import { useAttendancesByCurrentDate } from "../features/attendances/useAttendancesByCurrentDate";
import { useEffect, useState } from "react";
import { useUpdateTimeOutAll } from "../features/attendances/useUpdateTimeOutAll";

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
        <Body>
          {!isLoadingCurrentAttendances &&
            currentAttendances.length &&
            currentAttendances?.map((attendance) => (
              <TableRow key={attendance.attendanceId} attendance={attendance} />
            ))}
        </Body>
      </Table>
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
