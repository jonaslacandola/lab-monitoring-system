import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

import Table from "../../ui/Table";
import PopOver from "../../ui/PopOver";
import ComputerRow from "./ComputerRow";
import MiniSpinner from "../../ui/MiniSpinner";

import { useComputersByLabId } from "./useComputersByLabId";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

function ComputersTable({ location }) {
  const { computers, isLoadingComputers } = useComputersByLabId(location);
  const [next, setNext] = useState(10);
  const [prev, setPrev] = useState(0);
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy");
  const filteredComputers = computers?.filter((computer) => {
    switch (sortBy) {
      case "all":
        return computer;
      case "available":
        return computer.computerStatus === "available";
      case "unavailable":
        return computer.computerStatus === "unavailable";
      default:
        return computer;
    }
  });
  const paginated = filteredComputers?.slice(prev, next);
  const totalComputers = filteredComputers?.length;

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
        {isLoadingComputers && (
          <Container>
            <MiniSpinner />
          </Container>
        )}
        {!isLoadingComputers && (
          <Table.Body
            data={paginated}
            render={(computer) => (
              <ComputerRow key={computer.computerId} computer={computer} />
            )}
          />
        )}
        <Table.Footer>
          <span>
            Showing {totalComputers === 0 ? 0 : prev + 1} to{" "}
            {next > totalComputers ? totalComputers : next} of {totalComputers}{" "}
            results
          </span>
          <Container>
            <button onClick={onPrev} disabled={prev === 0}>
              <HiOutlineChevronLeft />
              <span>Previous</span>
            </button>
            <button
              onClick={onNext}
              disabled={!(next < filteredComputers?.length)}
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
