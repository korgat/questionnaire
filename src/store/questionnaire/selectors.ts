import { RootState } from "..";

export const selectAnswers = (state: RootState) => state.questionnaire.answers;
export const selectCurrentQuestionId = (state: RootState) =>
  state.questionnaire.currentQuestionId;
export const selectIsCompleted = (state: RootState) =>
  state.questionnaire.isCompleted;
export const selectHistory = (state: RootState) => state.questionnaire.history;
export const selectCanGoBack = (state: RootState) =>
  state.questionnaire.history.length > 0;

export const selectAnswerByQuestionId =
  (questionId: string) => (state: RootState) =>
    state.questionnaire.answers[questionId];

export const selectAnswerByField = (field: string) => (state: RootState) =>
  state.questionnaire.answers[field];
