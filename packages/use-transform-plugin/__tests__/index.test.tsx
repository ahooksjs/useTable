import React, { Fragment } from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import useFormTable, { IResponse } from '@ahooksjs/use-form-table';
import useTransfromPlugin from '../src/index';
import {
  SchemaMarkupField as Field,
  SchemaMarkupForm as SchemaForm,
  registerFormField,
  connect,
} from '@formily/react-schema-renderer';

const service = (data): Promise<IResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, 500);
  });
};

registerFormField(
  'string1',
  connect()((props) => {
    return <input {...props} value={props.value || ''} />;
  })
);

describe('useTransformPlugin#basic', () => {
  it('trim', async () => {
    const data = { name: 'ahooks' };

    const TestComponent = () => {
      const { formProps, tableProps } = useFormTable(
        (params) => {
          return service({ dataSource: [{ ...params, name: params.name || data.name }] });
        },
        { plugins: [useTransfromPlugin({ filter: 'trim' })] }
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

    fireEvent.change(queryByTestId('input') as HTMLElement, { target: { value: '   foo  ' } });
    fireEvent.click(queryByText('Submit') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('foo', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20, name: 'foo' }],
        loading: false,
      });
    });
  });

  it('undefined', async () => {
    const data = { name: 'ahooks' };
    let getParamsFn = () => ({} as any);

    const TestComponent = () => {
      const { formProps, tableProps, getParams } = useFormTable(
        (params) => {
          return service({ dataSource: [{ ...params, name: params.name || data.name }] });
        },
        { plugins: [useTransfromPlugin({ filter: 'undef' })] }
      );

      getParamsFn = getParams;

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
      expect(getParamsFn()).toStrictEqual({ current: 1, pageSize: 20 });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20, name: 'ahooks' }],
        loading: false,
      });
    });
  });
});
