import { SyntaxKind } from "ts-morph";
import type { Transformer } from ".";
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

export const transformPrefix: Transformer = async ({ sourceFile, config }) => {
  if (config.uno ? !config.uno.prefix : !config.tailwind?.prefix) {
    return sourceFile;
  }

  const _config = config.uno ? config.uno.prefix : config.tailwind?.prefix;

  // Find the cva function calls.
  sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .filter(node => node.getExpression().getText() === "cva")
    .forEach(node => {
      // cva(base, ...)
      if (node.getArguments()[0]?.isKind(SyntaxKind.StringLiteral)) {
        const defaultClassNames = node.getArguments()[0];
        if (defaultClassNames) {
          defaultClassNames.replaceWithText(
            `"${applyPrefix(defaultClassNames.getText()?.replace(/"/g, ""), _config)}"`
          );
        }
      }

      // cva(..., { variants: { ... } })
      if (node.getArguments()[1]?.isKind(SyntaxKind.ObjectLiteralExpression)) {
        node
          .getArguments()[1]
          ?.getDescendantsOfKind(SyntaxKind.PropertyAssignment)
          .find(node => node.getName() === "variants")
          ?.getDescendantsOfKind(SyntaxKind.PropertyAssignment)
          .forEach(node => {
            node.getDescendantsOfKind(SyntaxKind.PropertyAssignment).forEach(node => {
              const classNames = node.getInitializerIfKind(SyntaxKind.StringLiteral);
              if (classNames) {
                classNames?.replaceWithText(
                  `"${applyPrefix(classNames.getText()?.replace(/"/g, ""), _config)}"`
                );
              }
            });
          });
      }
    });

  // Find all jsx attributes with the name class.
  sourceFile.getDescendantsOfKind(SyntaxKind.JsxAttribute).forEach(node => {
    if (node.getName() === "class") {
      // class="..."
      if (node.getInitializer()?.isKind(SyntaxKind.StringLiteral)) {
        const value = node.getInitializer();
        if (value) {
          value.replaceWithText(`"${applyPrefix(value.getText()?.replace(/"/g, ""), _config)}"`);
        }
      }

      // class={...}
      if (node.getInitializer()?.isKind(SyntaxKind.JsxExpression)) {
        // Check if it's a call to cn().
        const callExpression = node
          .getInitializer()
          ?.getDescendantsOfKind(SyntaxKind.CallExpression)
          .find(node => node.getExpression().getText() === "cn");
        if (callExpression) {
          // Loop through the arguments.
          callExpression.getArguments().forEach(node => {
            if (
              node.isKind(SyntaxKind.ConditionalExpression) ||
              node.isKind(SyntaxKind.BinaryExpression)
            ) {
              node.getChildrenOfKind(SyntaxKind.StringLiteral).forEach(node => {
                node.replaceWithText(
                  `"${applyPrefix(node.getText()?.replace(/"/g, ""), _config)}"`
                );
              });
            }

            if (node.isKind(SyntaxKind.StringLiteral)) {
              node.replaceWithText(`"${applyPrefix(node.getText()?.replace(/"/g, ""), _config)}"`);
            }
          });
        }
      }
    }
  });

  return sourceFile;
};
