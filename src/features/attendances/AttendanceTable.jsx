import Table from "../../ui/Table";
import MiniSpinner from "../../ui/MiniSpinner";
import AttendanceRow from "./AttendanceRow";

import { useAttendancesByCurrentDate } from "./useAttendancesByCurrentDate";

function AttendanceTable({ filteredAttendances = [] }) {
  const { currentAttendances, isLoadingCurrentAttendances } =
    useAttendancesByCurrentDate();

  return (
    <Table>
      <Table.Header>
        <span>Student Id</span>
        <span>Name</span>
        <span>Year & Section</span>
        <span>Laboratory</span>
        <span>Computer</span>
        <span>Time in</span>
        <span>Time out</span>
      </Table.Header>

      {isLoadingCurrentAttendances && (
        <Table.Empty>
          <MiniSpinner />
        </Table.Empty>
      )}

      {Boolean(filteredAttendances?.length) && (
        <Table.Body
          data={filteredAttendances}
          render={(attendance) => (
            <AttendanceRow
              key={attendance.attendanceId}
              attendance={attendance}
            />
          )}
        />
      )}

      {!isLoadingCurrentAttendances &&
        Boolean(!filteredAttendances?.length) && (
          <Table.Body
            data={currentAttendances}
            render={(attendance) => (
              <AttendanceRow
                key={attendance.attendanceId}
                attendance={attendance}
              />
            )}
          />
        )}
    </Table>
  );
}

export default AttendanceTable;
