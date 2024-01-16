import styled from "styled-components";
import { formatTime } from "../../data/formatTime";
import { HiOutlineClock } from "react-icons/hi2";

const Row = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.8fr 0.6fr 0.6fr 0.5fr 0.5fr 0.4fr;
  padding: 8px;
  font-size: 15px;
  align-items: center;

  & span {
    color: var(--slate-700);
  }

  & svg {
    font-size: 18px;
  }
`;

const TimeOut = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--slate-100);
  }

  & span {
    font-size: 14px;
  }

  & svg {
    color: var(--blue-500);
    font-size: 1.2rem;
  }
`;

function TableRow({ attendance }) {
  const { students, computers, laboratories, timeIn, timeOut } = attendance;
  const { studentId, studentName, yearAndSection } = students;

  return (
    <Row>
      <span>{studentId}</span>
      <span>{studentName}</span>
      <span>{yearAndSection}</span>
      {laboratories ? (
        <span>{laboratories.laboratoryName}</span>
      ) : (
        <span>&mdash;</span>
      )}
      {computers ? <span>PC {computers.computer}</span> : <span>&mdash;</span>}
      <span>{formatTime(timeIn)}</span>
      <span>{timeOut ? formatTime(timeOut) : "--:-- --"}</span>
      {!timeOut && (
        <TimeOut>
          <HiOutlineClock />
          <span>Time out</span>
        </TimeOut>
      )}
    </Row>
  );
}

export default TableRow;
