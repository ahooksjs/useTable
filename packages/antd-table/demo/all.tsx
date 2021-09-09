import React, { Fragment } from 'react';
import useAntdTable from '@ahooksjs/antd-table';
import { Table, Pagination, Button, message } from 'antd';
import useFilterPlugin from '@ahooksjs/use-filter-plugin';
import useSortablePlugin from '@ahooksjs/use-sortable-plugin';
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

const filters = [
  {
    text: 'Nano 3',
    value: 3,
  },
  {
    text: 'Nano 678',
    value: 678,
  },
  {
    text: 'Other',
    value: 'other',
  },
];

const Component = () => {
  const selectionPlugin = useSelectionPlugin({ primaryKey: 'phone' });
  const sortablePlugin = useSortablePlugin();
  const filterPlugin = useFilterPlugin();

  const { tableProps, paginationProps, getSelectedRowKeys } = useAntdTable(list, {
    plugins: [filterPlugin, selectionPlugin, sortablePlugin],
  });

  return (
    <Fragment>
      <p>
        <Button
          onClick={() => {
            const selectedRowKeys = getSelectedRowKeys() || [];
            message.success(selectedRowKeys.join(','));
          }}
        >
          点击查看勾选值
        </Button>
      </p>

      <Table scroll={{ y: 300 }} {...tableProps}>
        <Table.Column title="email" dataIndex="email" filters={filters} />
        <Table.Column title="phone" dataIndex="phone" sorter />
        <Table.Column title="gender" dataIndex="gender" />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
    </Fragment>
  );
};

export default Component;
