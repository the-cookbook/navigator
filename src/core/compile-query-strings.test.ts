import compileQueryStrings from './compile-query-strings';

describe('core/compileQueryStrings()', () => {
  const queryStrings = [':page', ':orderBy'];

  it('should compile query string properly', () => {
    const params = { page: 1, orderBy: 'date' };

    const navigationRoutes = compileQueryStrings(queryStrings, params);

    expect(navigationRoutes).toBe('?page=1&orderBy=date');
  });

  it('should skip query string without value', () => {
    const params = { page: 1 };

    const navigationRoutes = compileQueryStrings(queryStrings, params);

    expect(navigationRoutes).toBe('?page=1');
  });

  it('should return empty string when no match', () => {
    const navigationRoutes = compileQueryStrings(queryStrings, {});

    expect(navigationRoutes).toBe('');
  });

  it('should normalise case into camelCase', () => {
    const customQueryStrings = [':order-by'];
    const params = { 'order-by': 'id' };

    const navigationRoutes = compileQueryStrings(customQueryStrings, params);

    expect(navigationRoutes).toBe('?orderBy=id');
  });
});
