import { DynamicValuesDefaults } from "@/types/questionnaire";

export const replaceDynamicValues = (
  text: string,
  localValues: Record<string, string> = {},
  dynamicValues: DynamicValuesDefaults,
): string => {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    if (
      localValues &&
      typeof localValues === "object" &&
      !Array.isArray(localValues) &&
      key in localValues
    ) {
      const value = localValues[key];

      if (dynamicValues[key]) {
        return dynamicValues[key][value];
      }
    }
    return match;
  });
};
