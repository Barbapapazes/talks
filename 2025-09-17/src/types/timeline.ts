interface StackItem {
  icon?: string
  src?: string
  name: string
}

export interface TimelineItem {
  icon: string
  img: string
  date: string
  title: string
  stack: StackItem[]
}
