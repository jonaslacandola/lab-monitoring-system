import styled from "styled-components";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

import Table from "../../ui/Table";
import PopOver from "../../ui/PopOver";
import ComputerRow from "./ComputerRow";

import { useLaboratories } from "../laboratories/useLaboratories";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

const maxCount = 10;

function ComputersTable({ computers = [] }) {
  const [pagination, setPagination] = useState();
  const [previous, setPrevious] = useState(0);
  const [next, setNext] = useState(maxCount);
  const { isLoadingLaboratories, laboratories } = useLaboratories();
  const totalComputers = computers.length;

  useEffect(
    function () {
      setPagination(computers?.slice(previous, next));
    },
    [previous, next, computers]
  );

  function onNext() {
    setNext((next) => next + maxCount);
    setPrevious((prev) => prev + maxCount);
  }

  function onPrevious() {
    setNext((next) => next - maxCount);
    setPrevious((prev) => prev - maxCount);
  }

  return (
    <PopOver>
      {!isLoadingLaboratories &&
        laboratories?.map((laboratory) => (
          <Table
            columns={" .6fr .8fr .6fr .5fr .1fr"}
            key={laboratory.laboratoryId}
          >
            <Table.Header>
              <span>Computer</span>
              <span>Location</span>
              <span>Status</span>
              <span>Damage</span>
            </Table.Header>

            <Table.Body
              data={pagination || []}
              render={(computer) =>
                laboratory.laboratoryId === computer.location && (
                  <ComputerRow key={computer.computerId} computer={computer} />
                )
              }
            />
            <Table.Footer>
              <span>
                Showing {previous + 1} to {next} of {totalComputers} computers
              </span>
              <Container>
                <button onClick={onPrevious} disabled={previous === 0}>
                  <HiOutlineChevronLeft />
                  <span>Previous</span>
                </button>
                <button onClick={onNext} disabled={next >= computers.length}>
                  <span>Next</span>
                  <HiOutlineChevronRight />
                </button>
              </Container>
            </Table.Footer>
          </Table>
        ))}
    </PopOver>
  );
}

export default ComputersTable;
