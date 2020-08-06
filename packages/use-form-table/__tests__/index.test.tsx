import React, { Fragment } from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import {
  SchemaMarkupField as Field,
  SchemaMarkupForm as SchemaForm,
  registerFormField,
  connect,
} from '@formily/react-schema-renderer';
import useFormTable from '../src/index';
import service from './fixtures/service';

describe('useFormTable#basic', () => {
  beforeEach(() => {
    registerFormField(
      'string',
      connect()((props) => {
        return <input {...props} value={props.value || ''} />;
      })
    );
  });

  it('submit', async () => {
    const data = { name: 'ahooks' };

    const TestComponent = () => {
      const { formProps, tableProps } = useFormTable((params) => {
        return service({ dataSource: [{ ...params, name: params.name || data.name }] });
      });

      return (
        <Fragment>
          <SchemaForm {...formProps}>
            <Field name={'name'} type="string" x-props={{ 'data-testid': 'input' }} />
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
});
