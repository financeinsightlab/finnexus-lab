// lib/placement-war-room/financial-evaluator.ts
// Re-exports canonical evaluation service for backwards compatibility.

export {
  evaluateFinanceAnswer,
  evaluateAnswer,
  evaluateAnswerWithRubric,
  validateNumericalAnswer,
  type EvaluationOptions,
  type NumericValidationResult,
} from './evaluation';
