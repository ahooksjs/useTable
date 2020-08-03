import { renderHook } from '@testing-library/react-hooks';
import <%= name %> from '..';

describe('<%= name %>', () => {
  it('should be defined', () => {
    expect(<%= name %>).toBeDefined();
  });

  it('success', async () => {
    const { result } = renderHook(() => <%= name %>());
    expect(result.current).toBe(true);
  });
});
