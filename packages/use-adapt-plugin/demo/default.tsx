import React, { Fragment } from 'react';
import { SchemaForm, Field, Submit, Reset, FormButtonGroup } from '@formily/next';
import { Input } from '@formily/next-components';
import useNextFormTable from '@ahooksjs/next-form-table';
import { Table, Pagination, Button, Message } from '@alifd/next';
import useAdaptPlugin from '@ahooksjs/use-adapt-plugin';

const list = ({ pageIndex, pageSize, ...formData }) => {
  let query = `page=${pageIndex}&size=${pageSize}`;

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
  const adaptPlugin = useAdaptPlugin({ map: { current: 'pageIndex' } });
  const { formProps, tableProps, paginationProps, getParams } = useNextFormTable(list, {
    plugins: [adaptPlugin],
  });

  return (
    <Fragment>
      <p>
        <Button
          onClick={() => {
            const params = getParams();
            Message.success(JSON.stringify(params));
            console.log(params);
          }}
        >
          点击查看参数
        </Button>
      </p>
      <SchemaForm {...formProps} components={{ Input }} style={{ marginBottom: 20 }} inline>
        <Field name="name" title="name" x-component={'Input'} />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>
      <Table primaryKey={'login.uuid'} {...tableProps}>
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
