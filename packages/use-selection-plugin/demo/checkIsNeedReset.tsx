import React, { Fragment, useState } from 'react';
import { SchemaForm, Field, Submit, Reset, FormButtonGroup } from '@formily/next';
import { Input } from '@formily/next-components';
import useNextFormTable, { methods } from '@ahooksjs/next-form-table';
import { Table, Pagination, Button, Message } from '@alifd/next';
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
        dataSource: res.results,
      },
    }));
};

const Component = () => {
  const [state, setState] = useState(0);
  const selectionPlugin = useSelectionPlugin({
    primaryKey: 'phone',
    checkIsNeedReset: (ctx) => {
      if (ctx.meta.queryFrom === methods.ON_REFRESH_DEPS) {
        return false;
      }
      return true;
    },
  });

  const { tableProps, paginationProps, formProps, getSelectedRowKeys } = useNextFormTable(list, {
    plugins: [selectionPlugin],
    refreshDeps: [state],
  });

  return (
    <Fragment>
      <p>
        <Button
          onClick={() => {
            const selected = getSelectedRowKeys();
            Message.success(selected.join(','));
            console.log(selected);
          }}
        >
          点击查看勾选值
        </Button>{' '}
        <Button
          onClick={() => {
            setState(Math.random());
          }}
        >
          刷新表格
        </Button>
      </p>

      <SchemaForm {...formProps} components={{ Input }} style={{ marginBottom: 20 }} inline>
        <Field name="name" title="name" x-component={'Input'} />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>

      <Table {...tableProps}>
        <Table.Column title="name" dataIndex="name.last" width={200} />
        <Table.Column title="email" dataIndex="email" width={500} />
        <Table.Column title="phone" dataIndex="phone" width={500} />
        <Table.Column title="gender" dataIndex="gender" width={200} />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
    </Fragment>
  );
};

export default Component;
