import { useCallback, useState } from 'react';
import traverse from './traverse';
import adapt from './adapt';
import { TUseTree, IResponse, IOptions } from './type';

export * from './type';

const useTreePlugin: TUseTree = (
  query = () => Promise.resolve({ data: { dataSource: [], total: 0 } }),
  options
) => {
  const { primaryKey = 'id', iterator = () => ({}), isCache = true } = (options || {}) as IOptions;
  const [state, setLazyTreeState] = useState({ openRowKeys: [] });
  const defaultChecker = useCallback(
    (node, pos, $payload) => node[primaryKey] === $payload.currentRowKey,
    []
  );

  const getOnRowOpen = useCallback(
    (ctx) => (openRowKeys, currentRowKey, expanded, currentRecord) => {
      const { params, actions } = ctx;
      const { dataSource } = actions.getState();

      const payload = {
        openRowKeys,
        currentRowKey,
        expanded,
        currentRecord,
      };

      if (!expanded || currentRecord.expanded) {
        // 没有打开就打开
        setLazyTreeState({ openRowKeys });
      } else {
        actions.setState({ loading: true });
        query(payload, params)
          .then((res) => adapt(res, primaryKey))
          .then((res: IResponse) => {
            const children = res.data.dataSource;
            const checker = primaryKey != null ? defaultChecker : iterator;

            traverse(dataSource, (node, pos) => {
              if (checker(node, pos, payload)) {
                // 标记已经打开过了，下次就不要去请求数据了
                if (isCache) {
                  node.expanded = true;
                }
                const mapper = node.indeterminate
                  ? (child) => {
                      return { ...child, parent: node[primaryKey] };
                    }
                  : (child) => {
                      return {
                        ...child,
                        parent: node[primaryKey],
                        checked: node.checked,
                      };
                    };

                node.children = children.map(mapper);
                return false;
              }
              return true;
            });

            setLazyTreeState({ openRowKeys });
            actions.setState({
              dataSource,
              loading: false,
            });
          });
      }
    },
    [state, primaryKey]
  );

  return {
    middlewares: (ctx, next) => {
      return next().then(() => {
        ctx.response = adapt(ctx.response, primaryKey);
        state.openRowKeys = [];
      });
    },

    props: (ctx) => ({
      lazyTree: {
        setLazyTreeState,
        state,
      },
      tableProps: {
        isTree: true,
        openRowKeys: state.openRowKeys,
        primaryKey,
        onRowOpen: getOnRowOpen(ctx),
      },
    }),
  };
};

export default useTreePlugin;
