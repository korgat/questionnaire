"use client";

import { useQuestionnaire } from "@/hooks/questionnaire/useQuestionnaire";
import { useAppSelector } from "@/store";
import { selectAnswers } from "@/store/questionnaire/selectors";
import { Question } from "@/types/questionnaire";

import { replaceDynamicValues } from "./helpers";
import { InfoQuestion } from "./InfoQuestion";
import { RadioQuestion } from "./RadioQuestion";

interface QuestionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  question: Question;
}

export const QuestionContainer = (props: QuestionContainerProps) => {
  const { question } = props;
  const { currentAnswer, handleAnswer } = useQuestionnaire(question.id);
  const allAnswers = useAppSelector(selectAnswers);

  let title = question.title;
  if (question.dynamicValues) {
    title = replaceDynamicValues(
      question.title,
      allAnswers,
      question.dynamicValues,
    );
  }

  const renderQuestion = () => {
    switch (question.type) {
      case "radio":
        return (
          <RadioQuestion
            questionId={question.id}
            title={title}
            options={question.options}
            description={question.description}
            onAnswer={handleAnswer}
            currentAnswer={currentAnswer as string}
          />
        );
      case "info":
        return (
          <InfoQuestion
            description={question.description}
            title={question.title}
            onContinue={() => handleAnswer(question.id)}
          />
        );
      default:
        return null;
    }
  };

  return renderQuestion();
};
