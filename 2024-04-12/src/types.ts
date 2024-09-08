// Only useful properties are kept
export type Question = {
  id: string
  slug: string
  type: QuestionType
  question: string
  talkId: string
  createdAt: string
} & ({
  type: 'text'
  options: QuestionOptionsText
} | {
  type: 'select'
  options: QuestionOptionsSelect
} | {
  type: 'multi-select'
  options: QuestionOptionsMultiSelect
})

export type QuestionType = 'text' | 'select' | 'multi-select'

export interface QuestionOptionsText {}

export interface QuestionOptionsSelectOption {
  color: string
  text: string
  value: string
}

export interface QuestionOptionsSelect {
  label: string
  options: QuestionOptionsSelectOption[]
  chartType: 'bar' | 'donut'
}

export interface QuestionOptionsMultiSelect {
  label: string
  options: QuestionOptionsSelectOption[]
  chartType: 'bar' | 'donut'
}

export type Answer = {
  id: string
  questionId: string
  createdAt: string
  type: 'text' | 'select' | 'multi-select'
} & ({
  type: 'text'
  value: {
    content: string
  }
} | {
  type: 'select'
  value: {
    value: string
  }
} | {
  type: 'multi-select'
  value: {
    values: string[]
  }
})
