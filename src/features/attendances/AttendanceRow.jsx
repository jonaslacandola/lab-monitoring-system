import Table from "../../ui/Table";

import { formatTime } from "../../data/formatTime";

function AttendanceRow({ attendance }) {
  const { students, laboratories, computers, timeIn, timeOut, createdAt } =
    attendance;
  const { studentId, studentName, yearAndSection } = students;

  const formattedTimeIn = formatTime(timeIn);
  const formattedTimeOut = formatTime(timeOut);

  return (
    <Table.Row>
      <span>{studentId}</span>
      <span>{studentName}</span>
      <span>{yearAndSection}</span>
      {laboratories ? (
        <span>{laboratories.laboratoryName}</span>
      ) : (
        <span>&mdash;</span>
      )}
      {computers ? <span>{computers.computer}</span> : <span>&mdash;</span>}
      <span>{formattedTimeIn}</span>
      <span>{formattedTimeOut}</span>
      <span>{createdAt}</span>
    </Table.Row>
  );
}

export default AttendanceRow;
