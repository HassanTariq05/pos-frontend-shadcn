import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const ownerAccountSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.any(),
  // .string()
  // .transform((val) => val.trim()) // remove spaces
  // .refine((val) => ['active', 'inactive'].includes(val.toLowerCase()), {
  //   message: 'Please select a valid status.',
  // })
  // .transform(
  //   (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
  // ),
})

export const policySchema = z.object({
  id: z.string(),
  title: z.string(),
  documentName: z.string().nullable().optional(),
  description: z.string(),
  status: z.any(),
})

export type BusinessAccount = z.infer<typeof ownerAccountSchema>

export type Policy = z.infer<typeof policySchema>
