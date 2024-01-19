import Calendar from "react-calendar";
import styled from "styled-components";

import ArchiveTable from "../features/archive/ArchiveTable";
import { useState } from "react";
import { useAttendancesByDate } from "../features/attendances/useAttendancesByDate";
import { format } from "date-fns";

import Spinner from "../ui/Spinner";

const StyledCalendar = styled(Calendar)`
  border: 1px solid var(--gray-200);
  border-radius: 8px;

  & button {
    color: var(--slate-700);
    border: none;
    background-color: transparent;
    transition: all ease-in-out 200ms;
    border-radius: 4px;
    cursor: pointer;
  }

  & button:hover {
    background-color: var(--blue-500);
    color: white;
  }

  & .react-calendar__month-view__weekdays {
    text-align: center;
    border-bottom: 1px solid var(--gray-200);
    padding: 8px;

    & .react-calendar__month-view__weekdays__weekday {
      & abbr {
        font-weight: 500;
        text-decoration: none;
      }
    }
  }

  & .react-calendar__month-view__days {
    & button {
      font-size: 15px;
      padding: 1rem;
    }

    & .react-calendar__tile--now {
      background-color: var(--gray-200);
      color: var(--slate-700);
    }

    & .react-calendar__month-view__days__day--neighboringMonth {
      color: var(--slate-400);
    }
  }

  & .react-calendar__navigation {
    display: flex;
    gap: 8px;
    padding: 4px;
    border-bottom: 1px solid var(--gray-200);

    & .react-calendar__navigation__arrow {
      font-size: 1.5rem;
      padding: 0 8px;
      border-radius: 4px;
    }

    & .react-calendar__navigation__label {
      border-radius: 4px;
      & span {
        font-size: 1rem;
        font-weight: 600;
      }
    }
  }
`;

function Archive() {
  const [attendances, setAttendances] = useState([]);
  const { getAttendances, isLoadingAttendances } = useAttendancesByDate();

  function handleDateChanged(selectedDate) {
    getAttendances(format(selectedDate, "yyyy-MM-dd"), {
      onSuccess: (data) => setAttendances(data),
    });
  }

  return (
    <>
      {isLoadingAttendances && <Spinner />}
      <h1>Attendance archive</h1>
      <StyledCalendar onChange={handleDateChanged} />
      <ArchiveTable attendances={attendances} />
    </>
  );
}

export default Archive;
