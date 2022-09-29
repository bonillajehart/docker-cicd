import React, { useState, useRef, useEffect } from 'react';

import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { Styled as S } from './PageTable.styles';

const stickyCheckboxWidth = 60;
const defaultColumnWidth = 135;

export type StickyColumnType = {
  id: string;
  label: string;
  sortable?: boolean;
  width?: number;
};

export type ColumnType = {
  id: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  width?: number;
  ellipsis?: boolean;
};

interface PageTableProps {
  idField: string;
  hasCheckbox?: boolean;
  rows: Record<string, string | number | any>[];
  totalRows?: number;
  perPage?: number;
  onChangePerPage?: (newPerPage: number) => void;
  currentPage?: number;
  onPaginate?: (newPage: number) => void;
  columns: ColumnType[];
  leftStickyColumns?: StickyColumnType[];
  rightStickyColumns?: StickyColumnType[];
  paginationSummary?: string;
  isLoading?: boolean;
  emptyRowsMessage?: string;
  sort?: {
    sortBy: string;
    sortDir: 'asc' | 'desc';
  };
  onSort?: (column: string) => void;
}

// @todo:
// - onChange checkboxes
// - tooltips
// - sort

// the parent should be displayed as flex
export const PageTable: React.FC<PageTableProps> = ({
  idField,
  rows,
  totalRows = 0,
  perPage = 5,
  onChangePerPage,
  currentPage = 1,
  onPaginate,
  hasCheckbox = false,
  columns,
  leftStickyColumns = [],
  rightStickyColumns = [],
  paginationSummary = '',
  isLoading = false,
  emptyRowsMessage = 'No rows data',
  sort = {
    sortBy: '',
    sortDir: 'asc',
  },
  onSort,
}) => {
  const tableScrollRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  useEffect(() => {
    const tableScrollElem = tableScrollRef.current;
    const borderThreshold = 20;

    const handleScroll = (event: any) => {
      const currentScrollPosition = event.target.scrollLeft;
      const totalScroll = event.target.scrollWidth - event.target.offsetWidth;

      setShowLeftShadow(!!leftStickyColumns.length && currentScrollPosition > borderThreshold);
      setShowRightShadow(!!rightStickyColumns.length && currentScrollPosition < totalScroll - borderThreshold);
    };

    if (tableScrollElem) {
      tableScrollElem.addEventListener('scroll', handleScroll);

      const initialScrollPosition = tableScrollRef.current?.scrollLeft || 0;
      const initialTotalScroll =
        (tableScrollRef.current?.scrollWidth || 0) - (tableScrollRef.current?.offsetWidth || 0);

      setShowRightShadow(!!rightStickyColumns.length && initialScrollPosition < initialTotalScroll - borderThreshold);
    }

    return () => {
      if (tableScrollElem) {
        tableScrollElem.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleSelectRow = (rowId: string | number) => {
    const selectedIndex = selected.indexOf(rowId);
    let newSelected: (string | number)[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.splice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleSort = (column: string) => {
    if (typeof onSort === 'function' && !isLoading) {
      onSort(column);
    }
  };

  const handleSelectAll = () => {
    if (selected.length < rows.length && !isLoading) {
      const newSelected = rows.map(({ id }) => id);
      setSelected(newSelected);
      return;
    }

    setSelected([]);
  };

  const renderLeftStickyHeaders = (): JSX.Element | null => {
    if (leftStickyColumns.length || hasCheckbox) {
      let containerWidth = hasCheckbox ? stickyCheckboxWidth : 0;
      containerWidth = leftStickyColumns.length
        ? leftStickyColumns.length * defaultColumnWidth + containerWidth
        : containerWidth;

      return (
        <S.LeftStickyTableCellHeader className={`${showLeftShadow ? 'header-box-shadow' : ''}`}>
          <S.StickyCellContainer style={{ width: `${containerWidth}px` }}>
            {hasCheckbox && (
              <S.StickyCellChild style={{ width: `${stickyCheckboxWidth}px` }}>
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={selected.length > 0 && selected.length >= rows.length}
                  onClick={handleSelectAll}
                />
              </S.StickyCellChild>
            )}
            {leftStickyColumns.map(({ id, label, sortable }) => {
              if (sortable) {
                return (
                  <S.StickyCellChild key={id} style={{ width: `${defaultColumnWidth}px` }}>
                    <div
                      tabIndex={-1}
                      role="button"
                      onClick={() => handleSort(id)}
                      onKeyDown={() => handleSort(id)}
                      className={`sort-button ${sort.sortBy === id ? 'active' : ''}`}
                    >
                      {label}
                      {sort.sortDir === 'asc' ? (
                        <ArrowUpwardIcon color="primary" />
                      ) : (
                        <ArrowDownwardIcon color="primary" />
                      )}
                    </div>
                  </S.StickyCellChild>
                );
              }
              return (
                <S.StickyCellChild key={id} style={{ width: `${defaultColumnWidth}px` }}>
                  {label}
                </S.StickyCellChild>
              );
            })}
          </S.StickyCellContainer>
        </S.LeftStickyTableCellHeader>
      );
    }

    return null;
  };

  const renderLeftStickyRows = (row: Record<string, any>): JSX.Element | null => {
    if (leftStickyColumns.length || hasCheckbox) {
      const isSelected = (rowId: number): boolean => selected.indexOf(rowId) !== -1;
      const isItemSelected = isSelected(row[idField]);

      // @todo: take into account the custom width
      let containerWidth = hasCheckbox ? stickyCheckboxWidth : 0;
      containerWidth = leftStickyColumns.length
        ? leftStickyColumns.length * defaultColumnWidth + containerWidth
        : containerWidth;

      return (
        <S.LeftStickyTableCell className={`${showLeftShadow ? 'column-box-shadow' : ''}`}>
          <S.StickyCellContainer style={{ width: `${containerWidth}px` }}>
            {hasCheckbox && (
              <S.StickyCellChild style={{ width: `${stickyCheckboxWidth}px` }}>
                <Checkbox color="primary" checked={isItemSelected} onClick={() => handleSelectRow(row[idField])} />
              </S.StickyCellChild>
            )}
            {leftStickyColumns.map(({ id }) => (
              <S.StickyCellChild key={`left-sticky-${id}-${row[idField]}`} style={{ width: `${defaultColumnWidth}px` }}>
                {row[id]}
              </S.StickyCellChild>
            ))}
          </S.StickyCellContainer>
        </S.LeftStickyTableCell>
      );
    }

    return null;
  };

  const renderImmutableHeaders = (): JSX.Element | null => {
    if (columns.length) {
      return (
        <>
          {/* @todo: implement sortable on immutable headers */}
          {columns.map((column) => (
            <S.TableCell key={column.id} className={column.ellipsis ? 'ellipsis' : ''}>
              <div style={{ width: column.width ?? defaultColumnWidth }}>{column.label}</div>
            </S.TableCell>
          ))}
        </>
      );
    }

    return null;
  };

  const renderImmutableRows = (row: Record<string, any>): JSX.Element | null => {
    if (columns.length) {
      return (
        <>
          {columns.map((column) => (
            <S.TableCell
              className={column.ellipsis ? 'ellipsis' : ''}
              key={`immutable-column-${column.id}-${row[idField]}`}
              align={column.align}
            >
              <div>{row[column.id]}</div>
            </S.TableCell>
          ))}
        </>
      );
    }

    return null;
  };

  const renderRightStickyHeaders = (): JSX.Element | null => {
    if (rightStickyColumns.length) {
      const containerWidth = rightStickyColumns.length
        ? rightStickyColumns.reduce((acc, column) => acc + (column.width || defaultColumnWidth), 0)
        : 0;

      return (
        <S.RightStickyTableCellHeader className={`${showRightShadow ? 'header-box-shadow' : ''}`}>
          <S.StickyCellContainer style={{ width: `${containerWidth}px` }}>
            {rightStickyColumns.map(({ id, label }) => (
              <S.StickyCellChild key={id} style={{ width: `${defaultColumnWidth}px` }}>
                {label}
              </S.StickyCellChild>
            ))}
          </S.StickyCellContainer>
        </S.RightStickyTableCellHeader>
      );
    }

    return null;
  };

  const renderRightStickyRows = (row: Record<string, any>): JSX.Element | null => {
    if (rightStickyColumns.length) {
      const containerWidth = rightStickyColumns.length
        ? rightStickyColumns.reduce((acc, column) => acc + (column.width || defaultColumnWidth), 0)
        : 0;

      return (
        <S.RightStickyTableCell className={`${showRightShadow ? 'column-box-shadow' : ''}`}>
          <S.StickyCellContainer style={{ width: `${containerWidth}px` }}>
            {rightStickyColumns.map((column) => (
              <S.StickyCellChild
                key={`right-sticky-${column.id}-${row[idField]}`}
                style={{ width: `${containerWidth}px` }}
              >
                {row[column.id]}
              </S.StickyCellChild>
            ))}
          </S.StickyCellContainer>
        </S.RightStickyTableCell>
      );
    }

    return null;
  };

  const handleChangePerPage = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: number;
    }>
  ) => {
    if (typeof onChangePerPage === 'function') {
      onChangePerPage(event.target.value);
    }
  };

  const handlePaginate = (e: React.ChangeEvent<unknown>, page: number) => {
    if (typeof onPaginate === 'function') {
      onPaginate(page);
    }
  };

  return (
    <>
      {isLoading && (
        <S.LoadingSpinnerContainer>
          <CircularProgress color="primary" />
        </S.LoadingSpinnerContainer>
      )}
      <S.TableWrapper ref={tableScrollRef}>
        <S.Table className={`${isLoading ? 'loading' : ''}`}>
          <S.TableHead>
            <TableRow>
              {renderLeftStickyHeaders()}
              {renderImmutableHeaders()}
              {renderRightStickyHeaders()}
            </TableRow>
          </S.TableHead>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow key={row[idField]}>
                  {renderLeftStickyRows(row)}
                  {renderImmutableRows(row)}
                  {renderRightStickyRows(row)}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + rightStickyColumns.length + leftStickyColumns.length}
                  align="center"
                >
                  {emptyRowsMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </S.Table>
      </S.TableWrapper>
      <S.PaginationWrapper>
        {!!paginationSummary && <Typography variant="body2">{paginationSummary}</Typography>}
        <Pagination
          count={Math.ceil(totalRows / Math.max(perPage, 1))}
          variant="outlined"
          shape="rounded"
          color="primary"
          page={currentPage}
          onChange={handlePaginate}
          disabled={isLoading}
        />
        <S.PerPageSelect
          defaultValue={5}
          value={perPage}
          variant="outlined"
          IconComponent={KeyboardArrowDownIcon}
          onChange={handleChangePerPage}
          disabled={isLoading}
        >
          <MenuItem value={5}>5 / page</MenuItem>
          <MenuItem value={10}>10 / page</MenuItem>
          <MenuItem value={20}>20 / page</MenuItem>
          <MenuItem value={50}>50 / page</MenuItem>
        </S.PerPageSelect>
      </S.PaginationWrapper>
    </>
  );
};
