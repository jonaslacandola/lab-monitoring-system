import Table from "../../ui/Table";

function formatTime(timeString) {
  if (!timeString) return "--:-- --";

  const [hours, minutes] = timeString.split(":");

  const formattedTime = new Date(0, 0, 0, hours, minutes).toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  );

  return formattedTime;
}

function AttendanceRow({ attendance }) {
  const { students, laboratories, computers, timeIn, timeOut } = attendance;
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
    </Table.Row>
  );
}

export default AttendanceRow;
