import { z } from 'zod'

const attachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  note: z.string(),
  date: z.string(),
})
export type Attachment = z.infer<typeof attachmentSchema>

export const attachmentListSchema = z.array(attachmentSchema)
