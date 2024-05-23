import * as p from "@clack/prompts";
import cl from "picocolors";
import { type ObjectIssue, type StringIssue, ValiError } from "valibot";

export const handleError = (error: unknown) => {
  if (typeof error === "string") {
    p.log.error(cl.red(error));
    process.exit(1);
  }

  if (error instanceof Error) {
    p.log.error(cl.red(error.message));
    process.exit(1);
  }

  if (error instanceof ValiError) {
    p.log.error(
      cl.red(
        error.issues
          .map(
            (v: StringIssue | ObjectIssue) =>
              // @ts-expect-error
              `[${v.path?.[0].key}] ${v.message}`
          )
          .join("\n")
          .toString()
      )
    );
    process.exit(1);
  }

  p.log.error("Something went wrong. Please try again");
  process.exit(1);
};
