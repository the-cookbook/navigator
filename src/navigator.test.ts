import navigator from './navigator';

jest.mock('./settings');

describe('navigator', () => {
  it('should throw error when route is not available', () => {
    const to = 'non-existent-route';

    expect(() => navigator[to]).toThrowErrorMatchingSnapshot();
  });

  it('should not throw error when route exists', () => {
    const to = 'profile';

    expect(navigator[to]).not.toThrowError();
  });
});
