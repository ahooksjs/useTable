import React, { useState, Fragment } from 'react';
import { SchemaForm, Field, Submit, Reset, FormButtonGroup } from '@formily/next';
import { Input } from '@formily/next-components';
import useNextFormTable from '@ahooksjs/next-form-table';
import { Table, Pagination, Select } from '@alifd/next';
import useRangePlugin from '@ahooksjs/use-range-plugin';

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
  const [state, setState] = useState('');
  const rangePlugin = useRangePlugin();
  const { formProps, tableProps, paginationProps, resetAndQuery } = useNextFormTable(list, {
    plugins: [rangePlugin],
  });

  return (
    <Fragment>
      <p>
        切换下拉框可以重新让表格重新刷新，并且重置其他值：
        <Select
          value={state}
          onChange={(type) => {
            resetAndQuery({ type });
            setState(type);
          }}
          dataSource={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
        />
      </p>
      <SchemaForm
        {...formProps}
        initialValues={{ name: 'zhanghou' }}
        components={{ Input }}
        style={{ marginBottom: 20 }}
        inline
      >
        <Field name="name" title="name" x-component={'Input'} />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>

      <Table fixedHeader maxBodyHeight={300} primaryKey={'login.uuid'} {...tableProps}>
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
