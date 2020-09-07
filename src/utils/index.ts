export function addClassPrefixHOF(prefix: string) {
  return (name?: string): string => {
    return [prefix, name].filter(Boolean).join('-');
  };
}
