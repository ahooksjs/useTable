import React, { Fragment } from 'react';
import { SchemaForm, Field, Submit, Reset, FormButtonGroup } from '@formily/next';
import { Select } from '@formily/next-components';
import useNextFormTable from '@ahooksjs/next-form-table';
import { Table, Pagination } from '@alifd/next';
import useAsyncDefaultPlugin from '@ahooksjs/use-async-default-plugin';

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

const select = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          { label: '默认选中', value: 'default_select' },
          { label: '测试', value: 'test' },
        ],
      });
    }, 1000);
  });
};

const Component = () => {
  const asyncDefaultPlugin = useAsyncDefaultPlugin({ query: select, field: 'name' });
  const { formProps, tableProps, paginationProps } = useNextFormTable(list, {
    plugins: [asyncDefaultPlugin],
  });

  return (
    <Fragment>
      <SchemaForm {...formProps} components={{ Select }} style={{ marginBottom: 20 }} inline>
        <Field name="name" title="name" x-component={'Select'} />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>

      <Table fixedHeader maxBodyHeight={300} primaryKey={'login.uuid'} {...tableProps}>
        <Table.Column title="name" dataIndex="name.last"  width={200} />
        <Table.Column title="email" dataIndex="email" width={500} />
        <Table.Column title="phone" dataIndex="phone" width={500} />
        <Table.Column title="gender" dataIndex="gender" width={200} />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
    </Fragment>
  );
};

export default Component;
