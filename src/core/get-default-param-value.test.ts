import getDefaultParamValue from './get-default-param-value';

interface DefaultValues {
  [key: string]: {
    path: string;
    value: string | boolean;
  };
}

describe('core/getDefaultParamValue()', () => {
  const defaultValues: DefaultValues = {
    type: {
      path: ':type(shift|date)',
      value: 'shift',
    },
    lineUuid: {
      path: ':lineUuid',
      value: null,
    },
  };

  Object.keys(defaultValues).forEach((param) => {
    const { path, value } = defaultValues[param];
    it(`should return "${value}" for parameter "${path}"`, () => {
      expect(getDefaultParamValue(param, path)).toEqual(value);
    });
  });
});
