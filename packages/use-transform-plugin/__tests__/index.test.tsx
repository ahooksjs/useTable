import { renderHook } from '@testing-library/react-hooks';
import useTransformPlugin from '../src';

describe('useTransformPlugin', () => {
  it('should be defined', () => {
    expect(useTransformPlugin).toBeDefined();
  });

  it('success', async () => {
    const { result } = renderHook(() => useTransformPlugin());
    expect(result.current).toBe(true);
  });
});
