type Input = {
  id: number;
  name: string;
};
export type Option = {
  label: string;
  value: number;
};
export function convertToOptions<T extends Input>(input: T[]): Option[] {
  return input.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
}
