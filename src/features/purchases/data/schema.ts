import { z } from 'zod'

const purchaseSchema = z.object({
  id: z.string(),
  product: z.string().optional(),
  purchaseName: z.string(),
  variant: z.string(),
  modelNumber: z.number(),
  engineNumber: z.string(),
  chassisNumber: z.string(),

  date: z.string(),
  party: z.string().optional(),
  commissionAgents: z.string().nullable().optional(),
  totalCommission: z.number().nonnegative().optional(),
  commissionGiven: z.number().nonnegative().optional(),
  purchasePrice: z.number().nonnegative().optional(),
  manualPage: z.string(),

  document: z.enum(['yes', 'no']).optional().default('yes'),
  town: z
    .object({
      id: z.union([z.string(), z.number()]),
      title: z.string(),
    })
    .nullable()
    .optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
})

export type Purchase = z.infer<typeof purchaseSchema>

export const purchaseListSchema = z.array(purchaseSchema)
