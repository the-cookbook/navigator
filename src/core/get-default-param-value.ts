/**
 * @desc Pickup the first option in a group as default value
 * @example
 * const name: 'type';
 * const path = /:type(active|deactivated|unknown);
 * getDefaultParamValue(name, path); // returns 'active'
 */
const getDefaultParamValue = (name: string | number, path: string): string | null => {
  const param = path.split('/').find((p) => p.includes(`:${name}`));
  const match = param?.match(/\((?<default>[A-z0-9-]+)/) ?? undefined;

  if (!match) {
    return null;
  }

  return match.groups.default;
};

export default getDefaultParamValue;
