import Table from "../../ui/Table";
import MiniSpinner from "../../ui/MiniSpinner";
import ComputerRow from "./ComputerRow";
import Spinner from "../../ui/Spinner";

import { useComputers } from "./useComputers";
import { useLaboratories } from "../laboratories/useLaboratories";
import PopOver from "../../ui/PopOver";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ComputersTable() {
  const { isLoadingComputers, computers } = useComputers();
  const { isLoadingLaboratories, laboratories } = useLaboratories();
  const [sortedComputers, setSortedComputers] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(
    function () {
      const sortBy = searchParams.get("sortBy");

      if (!sortBy) {
        setSortedComputers(
          computers?.slice().sort((a, b) => a.computer - b.computer)
        );
        return;
      }

      switch (sortBy) {
        case "ascending":
          setSortedComputers(
            computers?.slice().sort((a, b) => a.computer - b.computer)
          );
          break;
        case "descending":
          setSortedComputers(
            computers?.slice().sort((a, b) => b.computer - a.computer)
          );
          break;
        case "available":
          setSortedComputers((computers) =>
            computers?.filter(
              (computer) => computer.computerStatus === "available"
            )
          );
          break;
        case "unavailable":
          setSortedComputers((computers) =>
            computers?.filter(
              (computer) => computer.computerStatus === "unavailable"
            )
          );
          break;
      }
    },
    [searchParams, computers]
  );

  return (
    <>
      {isLoadingLaboratories && <Spinner />}
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

              {isLoadingComputers && (
                <Table.Empty>
                  <MiniSpinner />
                </Table.Empty>
              )}

              {!isLoadingComputers && (
                <Table.Body
                  data={sortedComputers?.length ? sortedComputers : computers}
                  render={(computer) =>
                    laboratory.laboratoryId === computer.location && (
                      <ComputerRow
                        key={computer.computerId}
                        computer={computer}
                      />
                    )
                  }
                />
              )}
            </Table>
          ))}
      </PopOver>
    </>
  );
}

export default ComputersTable;
