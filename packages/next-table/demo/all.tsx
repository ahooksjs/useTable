import React, { Fragment } from 'react';
import useNextTable from '@ahooksjs/next-table';
import useFilterPlugin from '@ahooksjs/use-filter-plugin';
import useSortablePlugin from '@ahooksjs/use-sortable-plugin';
import useSelectionPlugin from '@ahooksjs/use-selection-plugin';
import { Table, Pagination, Button, Message } from '@alifd/next';

const filters = [
  {
    label: 'Nano 3',
    value: 3,
  },
  {
    label: 'Nano 678',
    value: 678,
  },
  {
    label: 'Other',
    value: 'other',
  },
];

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
  const selectionPlugin = useSelectionPlugin({ primaryKey: 'phone' });
  const filterPlugin = useFilterPlugin();
  const sortablePlugin = useSortablePlugin();
  const { tableProps, paginationProps, getSelectedRowKeys } = useNextTable(list, {
    plugins: [filterPlugin, sortablePlugin, selectionPlugin],
  });

  return (
    <Fragment>
      <p>
        <Button
          onClick={() => {
            const selectedRowKeys = getSelectedRowKeys() || [];
            Message.success(selectedRowKeys.join(','));
          }}
        >
          点击查看勾选值
        </Button>
      </p>

      <Table fixedHeader maxBodyHeight={300} primaryKey={'login.uuid'} {...tableProps}>
        <Table.Column title="name" dataIndex="name.last" width={200} />
        <Table.Column
          title="email"
          dataIndex="email"
          width={500}
          filters={filters}
          filterMode={'single'}
        />
        <Table.Column title="phone" dataIndex="phone" width={500} sortable />
        <Table.Column title="gender" dataIndex="gender" width={200} />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
    </Fragment>
  );
};

export default Component;
