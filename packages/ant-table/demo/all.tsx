import React, { Fragment } from 'react';
import useAntdTable from '@ahooksjs/ant-table';
import { Table, Pagination, Button } from 'antd';
import useSelectionPlugin from '@ahooksjs/use-selection-plugin';

const list = ({ current, pageSize, ...formData }) => {
  let query = `page=${current}&size=${pageSize}`;

  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return window
    .fetch(`https://randomuser.me/api?results=${pageSize}&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      data: {
        total: 55,
        dataSource: res.results.map((data, i) => {
          return {
            ...data,
            key: i,
          };
        }),
      },
    }));
};

const Component = () => {
  const selectionPlugin = useSelectionPlugin({ primaryKey: 'phone' });
  const { tableProps, paginationProps, getSelectedRowKeys } = useAntdTable(list, {
    plugins: [selectionPlugin],
  });

  return (
    <Fragment>
      <p>
        <Button
          onClick={() => {
            console.log(getSelectedRowKeys());
          }}
        >
          点击查看勾选值
        </Button>
      </p>

      <Table {...tableProps}>
        <Table.Column title="email" dataIndex="email" width={500} />
        <Table.Column title="phone" dataIndex="phone" width={500} />
        <Table.Column title="gender" dataIndex="gender" width={200} />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
    </Fragment>
  );
};

export default Component;
