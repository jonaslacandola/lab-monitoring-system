import styled from "styled-components";
import ComputersTable from "../features/computers/ComputersTable";
import Menu from "../ui/Menu";
import Modal from "../ui/Modal";
import { HiMiniArrowPath, HiOutlinePlus } from "react-icons/hi2";
import { useUpdateComputersAllStatus } from "../features/computers/useUpdateComputersAllStatus";
import Spinner from "../ui/Spinner";
import CreateComputerForm from "../features/computers/CreateComputerForm";
import { useSearchParams } from "react-router-dom";
import { useComputers } from "../features/computers/useComputers";
import { useEffect, useState } from "react";
import EmptyPage from "../ui/EmptyPage";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

function Computers() {
  const { computers, isLoadingComputers } = useComputers();
  const [sortedComputers, setSortedComputers] = useState([]);
  const isNotAvailable = computers?.reduce(
    (acc, prev) =>
      prev.computerStatus === "unavailable" && !prev.computerDamage
        ? acc + 1
        : acc,
    0
  );
  const { isUpdatingAllStatus, updateAllStatus } =
    useUpdateComputersAllStatus();
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoading = isLoadingComputers || isUpdatingAllStatus;

  useEffect(
    function () {
      const sortBy = searchParams.get("sortBy");

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
          setSortedComputers(
            computers?.filter(
              (computer) => computer.computerStatus === "available"
            )
          );
          break;
        case "unavailable":
          setSortedComputers(
            computers?.filter(
              (computer) => computer.computerStatus === "unavailable"
            )
          );
          break;
      }
    },
    [searchParams, computers]
  );

  function handleSortChange(e) {
    const { value } = e.target;

    setSearchParams({ sortBy: value });
  }
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoadingComputers && (
        <Modal>
          <Container>
            <h1>All computers</h1>

            {Boolean(computers?.length) && (
              <Container>
                <Menu>
                  {Boolean(isNotAvailable) && (
                    <Menu.Button onClick={updateAllStatus}>
                      <span>Reset All</span>
                      <HiMiniArrowPath />
                    </Menu.Button>
                  )}
                  <Modal.Open window={"computers"}>
                    <Menu.Button>
                      <span>Add</span>
                      <HiOutlinePlus />
                    </Menu.Button>
                  </Modal.Open>
                </Menu>

                <Menu>
                  <select onChange={handleSortChange}>
                    <option value="ascending">
                      Sort computers (ascending)
                    </option>
                    <option value="descending">
                      Sort computers (descending)
                    </option>
                    <option value="available">
                      Sort computers all available
                    </option>
                    <option value="unavailable">
                      Sort computers all unavailable
                    </option>
                  </select>
                </Menu>
              </Container>
            )}
          </Container>

          {!computers?.length && <EmptyPage />}

          {(sortedComputers?.length || computers?.length) && (
            <ComputersTable
              computers={sortedComputers.length ? sortedComputers : computers}
            />
          )}

          <Modal.Window name={"computers"} position={"right"}>
            <CreateComputerForm />
          </Modal.Window>
        </Modal>
      )}
    </>
  );
}

export default Computers;
