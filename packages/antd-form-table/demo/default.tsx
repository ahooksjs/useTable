import '@formily/antd/lib/style';
import React, { Fragment } from 'react';
import { SchemaForm, Field, Submit, Reset, FormButtonGroup } from '@formily/antd';
import { Input } from '@formily/antd-components';
import useAntdFormTable from '@ahooksjs/antd-form-table';
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
  const { formProps, tableProps, paginationProps } = useAntdFormTable(list);

  return (
    <Fragment>
      <SchemaForm {...formProps} components={{ Input }} style={{ marginBottom: 20 }} inline>
        <Field name="name" title="name" x-component={'Input'} />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>

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
