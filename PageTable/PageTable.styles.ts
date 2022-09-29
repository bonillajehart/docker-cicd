import styled from 'styled-components';
import MuiTable from '@material-ui/core/Table';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';

const TableWrapper = styled.div`
  min-height: 180px;
  width: 100%;
  height: 80%;
  overflow-x: auto;
  overflow-y: scroll;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 10px;
  }
`;

const Table = styled(MuiTable)`
  border-collapse: separate;
  overflow: auto;
  width: 100%;
  display: table;
  border-spacing: 0;

  &.loading {
    opacity: 0.3;
  }
`;

const TableHead = styled(MuiTableHead)`
  position: sticky;
  top: 0px;
  background: #fff;
  z-index: 2;

  & span,
  & div {
    font-weight: bold;
  }
`;

const TableCell = styled(MuiTableCell)`
  &.ellipsis div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
  }
`;

const StickyTableCell = styled(MuiTableCell)`
  position: sticky;
  background: #fff;

  &.header-box-shadow {
    box-shadow: 0 0 5px 2px rgb(0 0 0 / 20%);
  }

  &.column-box-shadow {
    z-index: 1;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
  }
`;

const LeftStickyTableCellHeader = styled(StickyTableCell)`
  z-index: 50;
  left: 0;
`;

const LeftStickyTableCell = styled(StickyTableCell)`
  left: 0;
`;

const RightStickyTableCellHeader = styled(StickyTableCell)`
  z-index: 50;
  right: 0;
`;

const RightStickyTableCell = styled(StickyTableCell)`
  right: 0;
`;

const StickyCellContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StickyCellChild = styled.span`
  border: none;

  & > div.sort-button {
    display: flex;
    align-items: center;
    cursor: pointer;

    & > svg {
      margin-left: 6px;
    }
  }

  & > div.sort-button:not(.active) > svg {
    visibility: hidden;
  }

  &:hover > div.sort-button:not(.active) > svg {
    visibility: visible;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 14px;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

const PerPageSelect = styled(Select)`
  & > .MuiSelect-root {
    width: 82px;
    font-size: 14px;
    padding: 6px 12px 7px;
  }
`;

const LoadingSpinnerContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
`;

export const Styled = {
  TableWrapper,
  Table,
  TableHead,
  LeftStickyTableCellHeader,
  RightStickyTableCellHeader,
  LeftStickyTableCell,
  RightStickyTableCell,
  StickyCellContainer,
  StickyCellChild,
  TableCell,
  PaginationWrapper,
  PerPageSelect,
  LoadingSpinnerContainer,
};
