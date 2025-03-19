export const QUESTIONNAIRE_STORAGE = {
  history: "questionnaireHistory",
  answers: "questionnaireAnswers",
  progress: "questionnaireProgress",
} as const;
export type QuestionnaireStorageT =
  (typeof QUESTIONNAIRE_STORAGE)[keyof typeof QUESTIONNAIRE_STORAGE];

export const QUESTIONNAIRE_STEPS = {
  startStep: "init",
  endStep: "completed",
} as const;
export type QuestionnaireStepsT =
  (typeof QUESTIONNAIRE_STEPS)[keyof typeof QUESTIONNAIRE_STEPS];
