export type ExplainedVisuallyClickValue = number | [number, number]

export interface ExplainedVisuallyFileSystemItem {
  title: string
  icon?: string
  iconOpened?: string
  code?: string
  children?: ExplainedVisuallyFileSystemItem[]
}

export interface ExplainedVisuallyHttpResponse {
  file?: string
  code: string
}

export interface ExplainedVisuallyHttpLog {
  request: string
  response: ExplainedVisuallyHttpResponse
  click: ExplainedVisuallyClickValue
}

export interface ExplainedVisuallySelectedFile {
  file: string
  code: string
}

export interface ExplainedVisuallySelectedResponse {
  request: string
  response: ExplainedVisuallyHttpResponse
  file?: string
}
