import styled from "styled-components";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

import Table from "../../ui/Table";
import PopOver from "../../ui/PopOver";
import ComputerRow from "./ComputerRow";

import { useComputersByLabId } from "./useComputersByLabId";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

function ComputersTable({ location }) {
  const { computers = [] } = useComputersByLabId(location);
  const [paginated, setPaginated] = useState([]);
  const [sortedComputers, setSortedComputers] = useState([]);
  const [next, setNext] = useState(10);
  const [prev, setPrev] = useState(0);
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy");
  const totalComputers = sortedComputers?.length;

  useEffect(
    function () {
      switch (sortBy) {
        case "all": {
          setSortedComputers(
            computers.slice().sort((a, b) => a.computer - b.computer)
          );
          break;
        }
        case "available": {
          setSortedComputers(
            computers.filter(
              (computer) => computer.computerStatus === "available"
            )
          );
          break;
        }
        case "unavailable": {
          setSortedComputers(
            computers.filter(
              (computer) => computer.computerStatus === "unavailable"
            )
          );
          break;
        }
        default:
          setSortedComputers(
            computers.slice().sort((a, b) => a.computer - b.computer)
          );
      }
    },
    [computers, sortBy]
  );

  useEffect(
    function () {
      setPaginated(sortedComputers.slice(prev, next));
    },
    [prev, next, sortedComputers]
  );

  function onNext() {
    setNext((next) => next + 10);
    setPrev((prev) => prev + 10);
  }

  function onPrev() {
    setPrev((prev) => prev - 10);
    setNext((next) => next - 10);
  }

  return (
    <PopOver>
      <Table columns={" .6fr .8fr .6fr .5fr .1fr"}>
        <Table.Header>
          <span>Computer</span>
          <span>Location</span>
          <span>Status</span>
          <span>Damage</span>
        </Table.Header>

        <Table.Body
          data={paginated}
          render={(computer) => (
            <ComputerRow key={computer.computerId} computer={computer} />
          )}
        />
        <Table.Footer>
          <span>Showing {totalComputers} results</span>
          <Container>
            <button onClick={onPrev} disabled={prev === 0}>
              <HiOutlineChevronLeft />
              <span>Previous</span>
            </button>
            <button
              onClick={onNext}
              disabled={!(next < sortedComputers.length)}
            >
              <span>Next</span>
              <HiOutlineChevronRight />
            </button>
          </Container>
        </Table.Footer>
      </Table>
    </PopOver>
  );
}

export default ComputersTable;
