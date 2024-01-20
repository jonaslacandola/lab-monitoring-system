import Calendar from "react-calendar";
import styled from "styled-components";
import toast from "react-hot-toast";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import ArchiveTable from "../features/archive/ArchiveTable";
import { useState } from "react";
import { useAttendancesByDate } from "../features/attendances/useAttendancesByDate";
import { format } from "date-fns";

import Spinner from "../ui/Spinner";

const StyledCalendar = styled(Calendar)`
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  max-width: 50%;
  background-color: white;

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

    padding: 1rem 0;

    & .react-calendar__month-view__weekdays__weekday {
      &:not(:last-child) {
        border-right: 1px solid var(--gray-200);
      }

      & abbr {
        font-weight: 500;
        text-decoration: none;
      }
    }
  }

  & .react-calendar__month-view__days {
    & button {
      font-size: 14px;
      padding: 8px;
    }

    & .react-calendar__tile--now {
      background-color: var(--slate-200);
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

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const GraphContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  border: 1px solid var(--slate-200);
  border-radius: 8px;
  padding: 1rem 2rem;
`;

const Title = styled.p`
  font-size: 22px;
  font-weight: 600;
`;

const attendanceData = [
  {
    name: "Cisco Lab",
    attendance: 305,
    color: "var(--blue-500)",
  },
  {
    name: "Red Lab",
    attendance: 120,
    color: "var(--red-500)",
  },
  {
    name: "Mac Lab",
    attendance: 255,
    color: "var(--lime-500)",
  },
];

function Archive() {
  const [attendances, setAttendances] = useState([]);
  const { getAttendances, isLoadingAttendances } = useAttendancesByDate();

  function handleDateChanged(selectedDate) {
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      toast.error("Please select an older date.");
      return;
    }

    getAttendances(format(selectedDate, "yyyy-MM-dd"), {
      onSuccess: (data) => setAttendances(data),
    });
  }

  return (
    <>
      {isLoadingAttendances && <Spinner />}
      <h1>Attendance archive</h1>
      <Container>
        <StyledCalendar onChange={handleDateChanged} />
        <GraphContainer>
          <Title>Daily attendance</Title>
          <ResponsiveContainer height={240}>
            <PieChart>
              <Pie
                data={attendanceData}
                innerRadius={85}
                outerRadius={110}
                paddingAngle={6}
                dataKey="attendance"
              >
                {attendanceData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "4px",
                }}
              />
              <Legend
                width="30%"
                verticalAlign="middle"
                layout="vertical"
                align="right"
                iconType="circle"
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
        </GraphContainer>
      </Container>
      <ArchiveTable attendances={attendances} />
    </>
  );
}

export default Archive;
