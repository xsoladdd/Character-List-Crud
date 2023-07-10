export const joinClass = (...classes: Array<string | undefined>) => {
  return classes
    .filter((classFragment) => typeof classFragment !== `undefined`)
    .filter(Boolean)
    .join(` `);
};