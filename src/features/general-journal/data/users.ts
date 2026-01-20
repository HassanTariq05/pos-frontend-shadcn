import { faker } from '@faker-js/faker'

// Fixed seed → reproducible data
faker.seed(67890)

export const journalEntries = Array.from({ length: 250 }).flatMap(() => {
  const createdAt = faker.date.between({
    from: '2024-01-01',
    to: '2025-12-31',
  })

  function generateCustomId() {
    const letters = faker.string.alpha({ length: 3, casing: 'upper' }) // e.g., "ASD"
    const numbers = faker.number.int({ min: 100, max: 999 }) // e.g., "123"
    return `${letters}${numbers}`
  }

  const transactionId = generateCustomId()
  const amount = faker.number.int({ min: 500, max: 125000 })

  const description = faker.helpers.arrayElement([
    'Cash sales',
    'Payment received',
    'Bank deposit',
    'Supplier payment',
    'Utility bill',
    'Salary expense',
    'Miscellaneous expense',
  ])

  // Simulated chart of accounts
  const debitAccountName = faker.company.name()
  let creditAccountName = faker.company.name()

  return [
    {
      id: faker.number.int({ min: 100000, max: 999999 }),
      transactionId,
      account_id: debitAccountName,
      entry_type: 'DR',
      value: amount,
      description,
      created_at: createdAt.toISOString(),
    },
    {
      id: faker.number.int({ min: 100000, max: 999999 }),
      transactionId,
      account_id: creditAccountName,
      entry_type: 'CR',
      value: amount,
      description,
      created_at: createdAt.toISOString(),
    },
  ]
})
