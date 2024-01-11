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
  const [paginated, setPaginated] = useState([]);
  const [next, setNext] = useState(10);
  const [prev, setPrev] = useState(0);
  const [searchParams] = useSearchParams(0);

  const { computers = [] } = useComputersByLabId(location);
  const totalComputers = computers.length;

  useEffect(
    function () {
      setPaginated(computers.slice(prev, next));
    },
    [computers, prev, next]
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
          <span>Showing n to n of {totalComputers} computers</span>
          <Container>
            <button onClick={onPrev} disabled={prev === 0}>
              <HiOutlineChevronLeft />
              <span>Previous</span>
            </button>
            <button onClick={onNext} disabled={!(next < computers.length)}>
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
