import { createContext, useContext } from "react";
import styled from "styled-components";

const TableContext = createContext();

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  align-items: center;
  padding: 0.5rem 2rem;
  font-size: 15px;
  color: var(--slate-800);
`;

TableRow.defaultProps = {
  columns: "1fr 2fr 1.3fr 1.2fr 1.2fr 1.1fr 1.2fr",
};

const StyledHeader = styled(TableRow)`
  color: var(--slate-50);
  padding: 1rem 2rem;
  font-size: 15px;
  background-color: var(--slate-800);
  border-bottom: 1px solid var(--slate-200);
  border-radius: 6px 6px 0 0;
  text-transform: uppercase;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--slate-800);
  padding: 1rem 2rem;
  color: var(--slate-50);
  border-radius: 0 0 6px 6px;
  font-size: 15px;

  & button {
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;
    color: var(--slate-50);
    cursor: pointer;

    &:disabled,
    &:disabled svg {
      color: var(--gray-500);
      cursor: not-allowed;
    }

    & span {
      font-size: 14px;
    }

    & svg {
      color: var(--slate-50);
      font-size: 1rem;
    }
  }
`;

const StyledRow = styled(TableRow)`
  border-left: 1px solid var(--slate-100);
  border-right: 1px solid var(--slate-100);
  background-color: white;

  &:not(:last-child) {
    border-bottom: 1px solid var(--slate-100);
  }
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border-radius: 0 0 8px 8px;
  border-top: none;
  border: 1px solid var(--slate-200);
`;

const StyledBody = styled.section``;

function Table({ children, columns }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data?.length)
    return (
      <StyledBody>
        <Empty>
          <span>The table is empty, start by adding an item.</span>
        </Empty>
      </StyledBody>
    );

  return <StyledBody>{data?.map(render)}</StyledBody>;
}

function Footer({ children }) {
  return <StyledFooter>{children}</StyledFooter>;
}

Table.Footer = Footer;
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Empty = Empty;

export default Table;
