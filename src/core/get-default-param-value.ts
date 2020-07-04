const getDefaultParamValue = (name: string | number, path: string): string | null => {
  // Gets the first defined value for the parameter
  // e.g. /:type(active|deactivated|unknown) => 'active'
  const param = path.split('/').find((p) => p.includes(`:${name}`));
  const match = param?.match(/\((?<default>[A-z0-9-]+)/) ?? undefined;

  if (!match) {
    return null;
  }

  return match.groups.default;
};

export default getDefaultParamValue;
