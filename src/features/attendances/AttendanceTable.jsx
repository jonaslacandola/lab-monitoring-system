import Table from "../../ui/Table";
import MiniSpinner from "../../ui/MiniSpinner";
import AttendanceRow from "./AttendanceRow";

import { useAttendancesByCurrentDate } from "./useAttendancesByCurrentDate";

function AttendanceTable({ filteredAttendances = [] }) {
  const { currentAttendances, isLoadingCurrentAttendances } =
    useAttendancesByCurrentDate();

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

      {isLoadingCurrentAttendances ? (
        <Table.Empty>
          <MiniSpinner />
        </Table.Empty>
      ) : (
        <Table.Body
          data={
            filteredAttendances.length
              ? filteredAttendances
              : currentAttendances
          }
          render={(attendance) => (
            <AttendanceRow
              key={attendance.attendanceId}
              attendance={attendance}
            />
          )}
        />
      )}

      <Table.Footer></Table.Footer>
    </Table>
  );
}

export default AttendanceTable;
