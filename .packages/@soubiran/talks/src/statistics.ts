import { z } from 'zod'

export const talksEventStatisticsSchema = z.object({
  total: z.number(),
  byYear: z.record(z.string(), z.number()),
})

const talksTitleStatisticsSchema = z.object({
  count: z.number(),
  byYear: z.record(z.string(), z.number()),
})

export const talksStatisticsDataSchema = z.object({
  totalTalks: z.number(),
  totalTalksWithRecording: z.number(),
  talksByYear: z.record(z.string(), z.number()),
  talksByEvent: z.record(z.string(), talksEventStatisticsSchema),
  talksByTitle: z.record(z.string(), talksTitleStatisticsSchema),
  talksWithRecordingByYear: z.record(z.string(), z.number()),
  talksByCity: z.record(z.string(), talksEventStatisticsSchema),
})

export type TalksEventStatistics = z.infer<typeof talksEventStatisticsSchema>
export type TalksStatisticsData = z.infer<typeof talksStatisticsDataSchema>
