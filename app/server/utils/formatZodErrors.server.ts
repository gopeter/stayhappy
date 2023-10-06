import capitalize from "lodash/capitalize";
import type { ZodError } from "zod";

export function formatZodErrors(zodError: ZodError) {
  return Object.fromEntries(
    zodError.issues.map((errorObj) => [
      errorObj.path,
      capitalize(errorObj.message),
    ]),
  );
}
