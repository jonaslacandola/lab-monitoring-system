import styled from "styled-components";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Search from "../ui/Search";
import CreateAttendanceForm from "../features/attendances/CreateAttendanceForm";
import AttendanceTable from "../features/attendances/AttendanceTable";

import { useAttendancesByCurrentDate } from "../features/attendances/useAttendancesByCurrentDate";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Attendance() {
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("studentId");
  const { currentAttendances } = useAttendancesByCurrentDate();

  const filteredAttendances = currentAttendances?.filter(
    (attendance) => attendance.studentId === studentId
  );

  useEffect(function () {
    if (studentId && !filteredAttendances?.length)
      toast.error("Unable to find student Id.");
  });

  return (
    <>
      <Modal>
        <Container>
          <Modal.Open window={"attendance"}>
            <Button>Add attendance</Button>
          </Modal.Open>
          <Search />
        </Container>

        <Modal.Window name={"attendance"}>
          <CreateAttendanceForm />
        </Modal.Window>
      </Modal>
      <AttendanceTable filteredAttendances={filteredAttendances} />
    </>
  );
}

export default Attendance;
