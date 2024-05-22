import { splitClassName } from "./css";

export const applyPrefix = (input: string, prefix = "") => {
  const classNames = input.split(" ");
  const prefixed: string[] = [];
  for (const className of classNames) {
    const [variant, value, modifier] = splitClassName(className);
    if (variant) {
      modifier
        ? prefixed.push(
            `${variant}:${
              value!.startsWith("(") ? `(${prefix}${value!.slice(1)}` : prefix + value
            }/${modifier}`
          )
        : prefixed.push(
            `${variant}:${value!.startsWith("(") ? `(${prefix}${value!.slice(1)}` : prefix + value}`
          );
    } else {
      modifier
        ? prefixed.push(
            `${
              value!.startsWith("(") ? `(${prefix}${value!.slice(1)}` : prefix + value
            }/${modifier}`
          )
        : prefixed.push(
            `${value!.startsWith("(") ? `(${prefix}${value!.slice(1)}` : prefix + value}`
          );
    }
  }
  return prefixed.join(" ");
};

export const applyPrefixesCSS = (css: string, prefix: string) => {
  const lines = css.split("\n");
  let innerCSS = "";

  for (const line of lines) {
    if (line.includes("@apply")) {
      const originalTWCls = line.replace("@apply", "").trim();
      const prefixedTwCls = applyPrefix(originalTWCls, prefix);
      innerCSS = css.replace(originalTWCls, prefixedTwCls);
    }
  }
  return innerCSS;
};
