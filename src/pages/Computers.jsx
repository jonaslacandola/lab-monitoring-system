import { HiMiniArrowPath, HiOutlinePlus } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import Menu from "../ui/Menu";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import EmptyPage from "../ui/EmptyPage";
import ComputersTable from "../features/computers/ComputersTable";
import CreateComputerForm from "../features/computers/CreateComputerForm";

import { useUpdateComputersAllStatus } from "../features/computers/useUpdateComputersAllStatus";
import { useLaboratories } from "../features/laboratories/useLaboratories";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

function Computers() {
  const { laboratories, isLoadingLaboratories } = useLaboratories();
  const { isUpdatingAllStatus, updateAllStatus } =
    useUpdateComputersAllStatus();
  // const [, setSearchParams] = useSearchParams();

  const isLoading = isUpdatingAllStatus || isLoadingLaboratories;

  // function handleSortByAvailable() {
  //   setSearchParams({ sortBy: "available" });
  // }
  // function handleSortByUnavailable() {
  //   setSearchParams({ sortBy: "unavailable" });
  // }

  return (
    <>
      {isLoading && <Spinner />}

      <Modal>
        <Container>
          <h1>All computers</h1>

          {Boolean(laboratories?.length) && (
            <Container>
              <Menu>
                {/* <Menu.Button onClick={updateAllStatus}>
                  <span>Reset all</span>
                  <HiMiniArrowPath />
                </Menu.Button> */}
                <Modal.Open window={"computers"}>
                  <Menu.Button>
                    <span>Add</span>
                    <HiOutlinePlus />
                  </Menu.Button>
                </Modal.Open>
              </Menu>
              {/* <Menu>
                <Menu.Button onClick={handleSortByAvailable}>
                  <span>All available</span>
                </Menu.Button>
                <Menu.Button onClick={handleSortByUnavailable}>
                  <span>All unavailable</span>
                </Menu.Button>
              </Menu> */}
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
