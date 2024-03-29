import React, { Fragment } from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '@alifd/next';
import {
  SchemaMarkupField as Field,
  SchemaMarkupForm as SchemaForm,
  registerFormField,
  FormSpy,
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
  it('submit（点击查询）', async () => {
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

  it('reset（重置）', async () => {
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

  it('table（表格操作）', async () => {
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

  it('method（插件能获取从哪里请求的）', async () => {
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

  it('actions（暴露出来 actions）', async () => {
    const data = { name: 'ahooks' };
    let $actions = {} as { [name: string]: any };

    const TestComponent = () => {
      const { formProps, tableProps, actions } = useFormTable((params) => {
        return service({ dataSource: [{ ...params, name: params.name || data.name }] });
      });

      $actions = actions;

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

      const formState = $actions.getFormState();
      expect(formState.values).toEqual({ name: 'foo' });
    });
  });

  it('getFormState（只有点击查询和重置的时候才用到 form 的数据）', async () => {
    const data = { name: 'ahooks' };

    const TestComponent = () => {
      const { formProps, tableProps, paginationProps } = useFormTable((params) => {
        // 加上 total 25，让 pagination 出现分页
        return service({ dataSource: [{ ...params, name: params.name || data.name }], total: 25 });
      });

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

    await waitFor(() => {
      const element = screen.getByText('ahooks', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20 }],
        loading: false,
      });
    });

    fireEvent.change(queryByTestId('input') as HTMLElement, { target: { value: 'foo' } });
    // 没有点击查询的时候就点击第二页
    fireEvent.click(queryByText('2') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('ahooks', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 2, pageSize: 20, name: 'ahooks' }],
        loading: false,
      });
    });
  });

  it('query（点击查询）', async () => {
    const data = { name: 'ahooks' };

    const TestComponent = () => {
      const { formProps, tableProps, paginationProps, query } = useFormTable((params) => {
        // 加上 total 25，让 pagination 出现分页
        return service({ dataSource: [{ ...params, name: params.name || data.name }], total: 25 });
      });

      return (
        <Fragment>
          <button
            onClick={() => {
              query();
            }}
          >
            query
          </button>

          <SchemaForm {...formProps}>
            <Field name={'name'} type="string1" x-props={{ 'data-testid': 'input' }} />
            <button type="submit">Submit</button>
            <FormSpy selector={[]}>
              {({ form }) => {
                return (
                  <button
                    onClick={async () => {
                      try {
                        await form.reset();
                      } catch (e) {
                        // do nothing...
                      }
                    }}
                  >
                    Reset
                  </button>
                );
              }}
            </FormSpy>
          </SchemaForm>

          <div>{JSON.stringify(tableProps)}</div>
          <Pagination {...paginationProps} />
        </Fragment>
      );
    };

    const { queryByText, queryByTestId } = render(<TestComponent />);

    // 第一次是 current 是 1
    await waitFor(() => {
      const element = screen.getByText('ahooks', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20 }],
        loading: false,
      });
    });

    // 没有点击查询的时候就点击第二页
    fireEvent.click(queryByText('2') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('"current":2', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 2, pageSize: 20, name: 'ahooks' }],
        loading: false,
      });
    });

    fireEvent.click(queryByText('query') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('"current":2', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 2, pageSize: 20, name: 'ahooks' }],
        loading: false,
      });
    });

    // 重新查询会退到第一页
    fireEvent.change(queryByTestId('input') as HTMLElement, { target: { value: 'foo' } });
    fireEvent.click(queryByText('Submit') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('foo', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20, name: 'foo' }],
        loading: false,
      });
    });

    // 点击第二页
    fireEvent.click(queryByText('2') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('"current":2', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 2, pageSize: 20, name: 'foo' }],
        loading: false,
      });
    });

    // 重新执行 query()
    fireEvent.click(queryByText('query') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('"current":2', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 2, pageSize: 20, name: 'foo' }],
        loading: false,
      });
    });

    // Reset
    fireEvent.click(queryByText('Reset') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('"current":1', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 1, pageSize: 20, name: 'ahooks' }],
        loading: false,
      });
    });

    // 点击第二页
    fireEvent.click(queryByText('2') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('"current":2', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 2, pageSize: 20, name: 'ahooks' }],
        loading: false,
      });
    });

    // 重新执行 query()
    fireEvent.click(queryByText('query') as HTMLElement);
    await waitFor(() => {
      const element = screen.getByText('"current":2', { exact: false });
      expect(JSON.parse(element.innerHTML)).toEqual({
        dataSource: [{ ...data, current: 2, pageSize: 20, name: 'ahooks' }],
        loading: false,
      });
    });
  });
});
