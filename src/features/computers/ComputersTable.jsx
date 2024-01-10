import styled from "styled-components";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

import Table from "../../ui/Table";
import PopOver from "../../ui/PopOver";
import ComputerRow from "./ComputerRow";

import { useLaboratories } from "../laboratories/useLaboratories";

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

function ComputersTable({ computers }) {
  const { isLoadingLaboratories, laboratories } = useLaboratories();

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
              data={computers || []}
              render={(computer) =>
                laboratory.laboratoryId === computer.location && (
                  <ComputerRow key={computer.computerId} computer={computer} />
                )
              }
            />
            <Table.Footer>
              <span>Showing N to N of N computers.</span>
              <Container>
                <button disabled>
                  <HiOutlineChevronLeft />
                  <span>Previous</span>
                </button>
                <button>
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
