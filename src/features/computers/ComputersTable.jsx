import { useLaboratories } from "../laboratories/useLaboratories";
import Table from "../../ui/Table";
import PopOver from "../../ui/PopOver";
import ComputerRow from "./ComputerRow";

function ComputersTable({ sortedComputers }) {
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
              data={sortedComputers || []}
              render={(computer) =>
                laboratory.laboratoryId === computer.location && (
                  <ComputerRow key={computer.computerId} computer={computer} />
                )
              }
            />
          </Table>
        ))}
    </PopOver>
  );
}

export default ComputersTable;
