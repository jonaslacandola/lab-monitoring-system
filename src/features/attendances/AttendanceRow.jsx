import Table from "../../ui/Table";

import { formatTime } from "../../data/formatTime";

function AttendanceRow({ attendance }) {
  const { students, laboratories, computers, timeIn, timeOut, createdAt } =
    attendance;
  const { studentId, studentName, yearAndSection } = students;
  const { laboratoryName } = laboratories;
  const { computer } = computers ? computers : {};

  const formattedTimeIn = formatTime(timeIn);
  const formattedTimeOut = formatTime(timeOut);

  return (
    <Table.Row>
      <span>{studentId}</span>
      <span>{studentName}</span>
      <span>{yearAndSection}</span>
      <span>{laboratoryName}</span>
      <span>{computer ? computer : "-"}</span>
      <span>{formattedTimeIn}</span>
      <span>{formattedTimeOut}</span>
      <span>{createdAt}</span>
    </Table.Row>
  );
}

export default AttendanceRow;
