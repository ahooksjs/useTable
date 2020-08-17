import React, { Fragment } from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '@alifd/next';
import {
  SchemaMarkupField as Field,
  SchemaMarkupForm as SchemaForm,
  registerFormField,
  connect,
} from '@formily/react-schema-renderer';
import useFormTable, { methods } from '../src/index';
import service from './fixtures/service';

registerFormField(
  'string1',
  connect()((props) => {
    return <input {...props} value={props.value || ''} />;
  })
);

describe('useFormTable#basic', () => {
  it('submit', async () => {
    const data = { name: 'ahooks' };

    const TestComponent = () => {
      const { formProps, tableProps } = useFormTable((params) => {
        return service({ dataSource: [{ ...params, name: params.name || data.name }] });
      });

      return (
        <Fragment>
          <SchemaForm {...formProps}>
            <Field name={'name'} type="string1" x-props={{ 'data-testid': 'input' }} />
            <button type="submit">Submit</button>
          </SchemaForm>

          <div>{JSON.stringify(tableProps)}</div>
        </Fragment>
      );
    };

    const { queryByTestId, queryByText } = render(<TestComponent />);

    await waitFor(() => {
      const element = screen.getByText('ahooks', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20 }],
        loading: false,
      });
    });

    fireEvent.change(queryByTestId('input') as HTMLElement, { target: { value: 'foo' } });
    fireEvent.click(queryByText('Submit') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('foo', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20, name: 'foo' }],
        loading: false,
      });
    });
  });

  it('reset', async () => {
    const data = { name: 'ahooks' };

    const TestComponent = () => {
      const { formProps, tableProps } = useFormTable((params) => {
        return service({ dataSource: [{ ...params, name: params.name || data.name }] });
      });

      return (
        <Fragment>
          <SchemaForm {...formProps}>
            <Field name={'name'} type="string1" x-props={{ 'data-testid': 'input' }} />
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </SchemaForm>

          <div>{JSON.stringify(tableProps)}</div>
        </Fragment>
      );
    };

    const { queryByTestId, queryByText } = render(<TestComponent />);

    await waitFor(() => {
      const element = screen.getByText('ahooks', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20 }],
        loading: false,
      });
    });

    fireEvent.change(queryByTestId('input') as HTMLElement, { target: { value: 'foo' } });
    fireEvent.click(queryByText('Submit') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('foo', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20, name: 'foo' }],
        loading: false,
      });
    });

    fireEvent.click(queryByText('Reset') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('ahooks', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20, name: 'ahooks' }],
        loading: false,
      });
    });
  });

  it('table', async () => {
    const data = { name: 'ahooks' };

    const TestComponent = () => {
      const { formProps, tableProps, paginationProps } = useFormTable((params) => {
        return service({ dataSource: [{ ...params, name: params.name || data.name }], total: 25 });
      });

      return (
        <Fragment>
          <SchemaForm {...formProps}>
            <Field name={'name'} type="string1" x-props={{ 'data-testid': 'input' }} />
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </SchemaForm>

          <div>{JSON.stringify(tableProps)}</div>

          <Pagination {...paginationProps} />
        </Fragment>
      );
    };

    const { queryByTestId, queryByText } = render(<TestComponent />);

    await waitFor(() => {
      const element = screen.getByText('ahooks', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20 }],
        loading: false,
      });
    });

    fireEvent.change(queryByTestId('input') as HTMLElement, { target: { value: 'foo' } });
    fireEvent.click(queryByText('Submit') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('foo', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20, name: 'foo' }],
        loading: false,
      });
    });

    fireEvent.click(queryByText('2') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('"current":2', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 2, pageSize: 20, name: 'foo' }],
        loading: false,
      });
    });

    fireEvent.change(queryByTestId('input') as HTMLElement, { target: { value: 'bar' } });
    fireEvent.click(queryByText('Submit') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('bar', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20, name: 'bar' }],
        loading: false,
      });
    });

    fireEvent.click(queryByText('Reset') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('ahooks', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20, name: 'ahooks' }],
        loading: false,
      });
    });
  });

  it('method', async () => {
    const data = { name: 'ahooks' };
    let method = methods.ON_FORM_MOUNT;

    const usePlugin = () => {
      return {
        middlewares: (ctx, next) => {
          expect(ctx.meta.queryFrom).toEqual(method);
          return next();
        },
      };
    };

    const TestComponent = () => {
      const { formProps, tableProps } = useFormTable(
        (params) => {
          return service({ dataSource: [{ ...params, name: params.name || data.name }] });
        },
        {
          plugins: [usePlugin()],
        }
      );

      return (
        <Fragment>
          <SchemaForm {...formProps}>
            <Field name={'name'} type="string1" x-props={{ 'data-testid': 'input' }} />
            <button type="submit">Submit</button>
          </SchemaForm>

          <div>{JSON.stringify(tableProps)}</div>
        </Fragment>
      );
    };

    const { queryByTestId, queryByText } = render(<TestComponent />);

    await waitFor(() => {
      const element = screen.getByText('ahooks', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20 }],
        loading: false,
      });
    });

    fireEvent.change(queryByTestId('input') as HTMLElement, { target: { value: 'foo' } });
    fireEvent.click(queryByText('Submit') as HTMLElement);
    method = methods.ON_FORM_SUBMIT;
    await waitFor(() => {
      const element = screen.getByText('foo', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20, name: 'foo' }],
        loading: false,
      });
    });
  });
});
