import { replaceDynamicValues } from "@/components/questions/helpers";
import { Question } from "@/types/questionnaire";

export const getQuestionTitleByField = (
  field: string,
  answers: { [questionId: string]: string },
  questions: { [key: string]: Question },
) => {
  const question = Object.values(questions).find((q) => q.field === field);
  let transformedTitle = question?.title || field;

  if (question?.dynamicValues) {
    transformedTitle = replaceDynamicValues(
      question?.title,
      answers,
      question.dynamicValues,
    );
  }
  return transformedTitle;
};

export const getOptionLabel = (
  field: string,
  value: string,
  questions: { [key: string]: Question },
) => {
  const question = Object.values(questions).find((q) => q.field === field);
  const option = question?.options?.find((opt) => opt.value === value);
  return option?.label || value;
};
