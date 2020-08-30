/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Table as TableRSuite } from 'rsuite';

import '../../assets/styles/rsuite-custom.css';
import './styles.css';

const { Column, HeaderCell, Cell, Pagination } = TableRSuite;

const menuPerPage = [
  {
    value: 10,
    label: 10,
  },
  {
    value: 20,
    label: 20,
  },
  {
    value: 25,
    label: 25,
  },
  {
    value: 50,
    label: 50,
  },
];

interface IFields {
  dataKey?: string;
  display: string;
  flexGrow: number;
  body?: (rowData: any) => JSX.Element;
}

interface ITableData {
  list: any[] | undefined;
  loading: boolean;
  fields: IFields[];
  page: number;
  perPage: number;
  total: number | undefined;
  handleChangePage: (newPage: number) => void;
  handleChangeLength: (newPerPage: number) => void;
}

const Table: React.FC<ITableData> = ({
  list,
  loading,
  fields,
  page,
  perPage,
  total,
  handleChangePage,
  handleChangeLength,
}) => {
  return (
    <div className="list-table">
      <TableRSuite
        width={window.innerWidth * 0.9}
        data={list}
        loading={loading}
        autoHeight
        hover={false}
      >
        {fields.map((item) => (
          <Column flexGrow={item.flexGrow}>
            <HeaderCell
              style={{
                background: 'var(--color-primary-900)',
                fontSize: 16,
                fontFamily: 'Roboto',
                color: 'var(--color-primary-200)',
              }}
            >
              {item.display}
            </HeaderCell>
            {item.dataKey ? (
              <Cell dataKey={item.dataKey} />
            ) : item.body ? (
              <Cell>{item.body}</Cell>
            ) : null}
          </Column>
        ))}
      </TableRSuite>

      <Pagination
        lengthMenu={menuPerPage}
        activePage={page}
        displayLength={perPage}
        total={total}
        onChangePage={handleChangePage}
        onChangeLength={handleChangeLength}
        className="table-pagination"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
        renderLengthMenu={(picker: React.ReactNode) => (
          <div style={{ color: 'var(--color-primary-200)' }}>
            {picker as JSX.Element} /por página
          </div>
        )}
        renderTotal={(totalInList: number) => (
          <div style={{ color: 'var(--color-primary-200)', marginRight: 20 }}>
            Total : {totalInList}
          </div>
        )}
      />
    </div>
  );
};

export default Table;
