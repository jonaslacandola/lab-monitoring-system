import Table from "../../ui/Table";
import AttendanceRow from "../attendances/AttendanceRow";

function ArchiveTable({ attendances = [] }) {
  return (
    <Table columns={"1fr 1.8fr 1.5fr 1.2fr 1.1fr 1fr 1.1fr .9fr"}>
      <Table.Header>
        <span>Student Id</span>
        <span>Name</span>
        <span>Year & Section</span>
        <span>Laboratory</span>
        <span>Computer</span>
        <span>Time in</span>
        <span>Time out</span>
        <span>Date</span>
      </Table.Header>
      <Table.Body
        data={attendances}
        render={(attendance) => (
          <AttendanceRow
            key={attendance.attendanceId}
            attendance={attendance}
          />
        )}
      ></Table.Body>
      <Table.Footer>
        <span>Showing</span>
      </Table.Footer>
    </Table>
  );
}

export default ArchiveTable;
