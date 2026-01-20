import { z } from 'zod'

const productSchema = z.object({
  id: z.string(),
  productName: z.string(),
  variant: z.string(),
  modelNumber: z.number(),
  engineNumber: z.string(),
  chassisNumber: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Product = z.infer<typeof productSchema>

export const productListSchema = z.array(productSchema)
