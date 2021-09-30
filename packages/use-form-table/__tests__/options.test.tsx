import React, { Fragment, useState } from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import {
  SchemaMarkupField as Field,
  SchemaMarkupForm as SchemaForm,
  registerFormField,
  connect,
} from '@formily/react-schema-renderer';
import { Pagination, Button } from '@alifd/next';
import useFormTable from '../src/index';
import service from './fixtures/service';

registerFormField(
  'string1',
  connect()((props) => {
    return <input {...props} value={props.value || ''} />;
  })
);

describe('useFormTable#options', () => {
  it('refreshDeps', async () => {
    const TestComponent = () => {
      const [state, setState] = useState(true);
      const { formProps, tableProps, paginationProps } = useFormTable(
        (params) => {
          return service({ dataSource: [{ ...params }] });
        },
        {
          refreshDeps: [state],
        }
      );

      return (
        <Fragment>
          <Button
            data-testid={'button'}
            onClick={() => {
              setState(!state);
            }}
          >
            点击
          </Button>

          <SchemaForm {...formProps}>
            <Field name={'name'} type="string1" x-props={{ 'data-testid': 'input' }} />
            <Field
              visible={state}
              name={'bar'}
              type="string1"
              x-props={{ 'data-testid': 'input1' }}
            />
            <button type="submit">Submit</button>
          </SchemaForm>

          <div>{JSON.stringify(tableProps)}</div>
          <Pagination {...paginationProps} />
        </Fragment>
      );
    };

    const { queryByTestId, queryByText } = render(<TestComponent />);
    fireEvent.change(queryByTestId('input') as HTMLElement, { target: { value: 'foo' } });
    fireEvent.change(queryByTestId('input1') as HTMLElement, { target: { value: 'bar' } });
    fireEvent.click(queryByText('Submit') as HTMLElement);

    await waitFor(() => {
      const element = screen.getByText('foo', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ current: 1, pageSize: 20, name: 'foo', bar: 'bar' }],
        loading: false,
      });
    });

    fireEvent.click(queryByTestId('button') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('foo', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ current: 1, pageSize: 20, name: 'foo' }],
        loading: false,
      });
    });
  });

  it('transformer（格式化参数）', async () => {
    const data = { name: 'ahooks' };

    const TestComponent = () => {
      const { formProps, tableProps, paginationProps } = useFormTable(
        (params) => {
          return service({ dataSource: [{ ...params, name: params.name || data.name }] });
        },
        {
          transformer: (params) => {
            return {
              ...params,
              test: 1,
              name: (params.name || '').toUpperCase(),
            };
          },
        }
      );

      return (
        <Fragment>
          <SchemaForm {...formProps}>
            <Field name={'name'} type="string1" x-props={{ 'data-testid': 'input' }} />
            <button type="submit">Submit</button>
          </SchemaForm>

          <div>{JSON.stringify(tableProps)}</div>
          <Pagination {...paginationProps} />
        </Fragment>
      );
    };

    const { queryByTestId, queryByText } = render(<TestComponent />);
    fireEvent.change(queryByTestId('input') as HTMLElement, { target: { value: 'foo' } });
    fireEvent.click(queryByText('Submit') as HTMLElement);

    await waitFor(() => {
      const element = screen.getByText('foo', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20, name: 'FOO', test: 1 }],
        loading: false,
      });
    });
  });
});
