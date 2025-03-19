"use client";

import { questionnaireConfig } from "@/config/questionnaires/config";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  completeQuestionnaire,
  saveAnswer,
  setCurrentQuestion,
} from "@/store/questionnaire/slice";

import { selectAnswers, selectHistory } from "@/store/questionnaire/selectors";
import { Question, QuestionnaireAnswers } from "@/types/questionnaire";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useQuestionnaire = (questionId: string) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const question = questionnaireConfig.questions[questionId];

  const allAnswers = useAppSelector(selectAnswers);
  const history = useAppSelector(selectHistory);

  const field = question.field;
  const currentAnswer = field && allAnswers[field];

  const handleAnswer = useCallback(
    (questionId: string, value?: string) => {
      const question = questionnaireConfig.questions[questionId];

      if (question.field && value) {
        const field = question.field || questionId;

        dispatch(
          saveAnswer({
            field,
            answer: value,
          }),
        );
      }

      const nextQuestionId = getNextQuestionId(question, allAnswers, value);

      if (nextQuestionId === "completed") {
        dispatch(completeQuestionnaire());
        router.push("/questionnaire/completed");
        return;
      }

      dispatch(setCurrentQuestion(nextQuestionId));

      router.push(`/questionnaire/${nextQuestionId}`);
    },
    [dispatch, router, allAnswers],
  );

  const getNextQuestionId = (
    question: Question,
    answers: QuestionnaireAnswers,
    value?: string,
  ): string => {
    if (typeof question.navigationRule === "string") {
      return question.navigationRule;
    }

    const matchedRule = question.navigationRule.find((rule) => {
      if (rule.condition.field === question.field) {
        return rule.condition.value === value;
      }

      const previousAnswer = answers[rule.condition.field];
      if (previousAnswer) {
        return previousAnswer === rule.condition.value;
      }

      return false;
    });

    if (matchedRule) {
      return matchedRule.nextId;
    }

    return "completed";
  };

  return {
    question,
    currentAnswer,
    allAnswers,
    history,
    handleAnswer,
  };
};
