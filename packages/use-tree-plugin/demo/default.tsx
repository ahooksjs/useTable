import React, { Fragment } from 'react';
import { SchemaForm, Field, Submit, Reset, FormButtonGroup } from '@formily/next';
import { Input } from '@formily/next-components';
import useNextFormTable from '@ahooksjs/next-form-table';
import { Table, Pagination } from '@alifd/next';
import useTreePlugin, { IResponse } from '@ahooksjs/use-tree-plugin';

const list: () => Promise<IResponse> = () => {
  const dataSource = {
    data: {
      total: 55,
      dataSource: [
        {
          id: Math.random(),
          email: 'testEmail',
          phone: 'testPhone',
          gender: 'gender',
          lazyChildren: true,
        },
        {
          id: Math.random(),
          email: 'testEmail',
          phone: 'testPhone',
          gender: 'gender',
          lazyChildren: true,
        },
        {
          id: Math.random(),
          email: 'testEmail',
          phone: 'testPhone',
          gender: 'gender',
        },
      ],
    },
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataSource);
    }, 1000);
  });
};

const Component = () => {
  const treePlugin = useTreePlugin(list);
  const { formProps, tableProps, paginationProps } = useNextFormTable(list, {
    plugins: [treePlugin],
  });

  return (
    <Fragment>
      <SchemaForm {...formProps} components={{ Input }} style={{ marginBottom: 20 }} inline>
        <Field name="name" title="name" x-component={'Input'} />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>

      <Table primaryKey={'login.uuid'} {...tableProps}>
        <Table.Column title="email" dataIndex="email" width={500} />
        <Table.Column title="phone" dataIndex="phone" width={500} />
        <Table.Column title="gender" dataIndex="gender" width={500} />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
    </Fragment>
  );
};

export default Component;
