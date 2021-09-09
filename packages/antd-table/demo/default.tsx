import React, { Fragment } from 'react';
import useAntdTable from '@ahooksjs/antd-table';
import { Table, Pagination } from 'antd';

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
        dataSource: res.results,
      },
    }));
};

const Component = () => {
  const { tableProps, paginationProps } = useAntdTable(list);

  return (
    <Fragment>
      <Table scroll={{ y: 300 }} {...tableProps}>
        <Table.Column title="email" dataIndex="email" />
        <Table.Column title="phone" dataIndex="phone" />
        <Table.Column title="gender" dataIndex="gender" />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
    </Fragment>
  );
};

export default Component;
