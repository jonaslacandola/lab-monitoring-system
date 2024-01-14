import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import Menu from "../ui/Menu";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import EmptyPage from "../ui/EmptyPage";
import ComputersTable from "../features/computers/ComputersTable";

import CreateComputerForm from "../features/computers/CreateComputerForm";
import { useLaboratories } from "../features/laboratories/useLaboratories";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

function Computers() {
  const [sort, setSort] = useState("all");
  const { laboratories, isLoadingLaboratories } = useLaboratories();
  const [, setSearchParams] = useSearchParams();

  const isLoading = isLoadingLaboratories;

  function handleSortChange(sortBy) {
    setSearchParams({ sortBy });
    setSort(sortBy);
  }

  return (
    <>
      {isLoading && <Spinner />}

      <Modal>
        <Container>
          <h1>All computers</h1>

          {Boolean(laboratories?.length) && (
            <Container>
              <Menu>
                <Modal.Open window={"computers"}>
                  <Menu.Button>
                    <span>Add</span>
                    <HiOutlinePlus />
                  </Menu.Button>
                </Modal.Open>
              </Menu>
              <Menu>
                <Menu.Button
                  active={Boolean(sort === "all").toString()}
                  onClick={() => handleSortChange("all")}
                >
                  <span>All computers</span>
                </Menu.Button>
                <Menu.Button
                  active={Boolean(sort === "available").toString()}
                  onClick={() => handleSortChange("available")}
                >
                  <span>All available</span>
                </Menu.Button>
                <Menu.Button
                  active={Boolean(sort === "unavailable").toString()}
                  onClick={() => handleSortChange("unavailable")}
                >
                  <span>All unavailable</span>
                </Menu.Button>
              </Menu>
            </Container>
          )}
        </Container>

        {!isLoading && Boolean(!laboratories?.length) && <EmptyPage />}

        {Boolean(laboratories?.length) &&
          laboratories.map((laboratory) => (
            <ComputersTable
              key={laboratory.laboratoryId}
              location={laboratory.laboratoryId}
            />
          ))}

        <Modal.Window name={"computers"} position={"right"}>
          <CreateComputerForm />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default Computers;
