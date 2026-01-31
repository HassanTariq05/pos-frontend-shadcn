import { faker } from '@faker-js/faker'
import { Purchase } from './schema'

// Fixed seed for reproducible data
faker.seed(67890)

export const townssData = [
  { id: 't1', title: 'Gulshan-e-Iqbal' },
  { id: 't2', title: 'North Nazimabad' },
  { id: 't3', title: 'Clifton' },
  { id: 't4', title: 'Defence (DHA)' },
  { id: 't5', title: 'Saddar' },
  { id: 't6', title: 'Korangi' },
  { id: 't7', title: 'Malir' },
  { id: 't8', title: 'Liaquatabad' },
  // add more if needed
]

export const purchases = Array.from({ length: 500 }, () => {
  const date = faker.date.between({
    from: '2024-01-01',
    to: '2025-12-31',
  })
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const partyName = `${faker.company.name()} ${faker.company.buzzAdjective()}`

  const randomTown = faker.helpers.arrayElement(townssData)

  return {
    id: faker.string.uuid(),

    purchaseName: faker.vehicle.manufacturer(),
    variant: faker.vehicle.model(),
    modelNumber: faker.number.int({ min: 2018, max: 2026 }),
    engineNumber: faker.string.alphanumeric(12).toUpperCase(),
    chassisNumber: faker.string.alphanumeric(17).toUpperCase(),
    manualPage: faker.string.alphanumeric(2),

    date: date.toISOString().split('T')[0],
    party: partyName,
    commissionAgents: faker.datatype.boolean()
      ? `${faker.person.fullName()}, ${faker.person.fullName()}`
      : null,
    totalCommission: faker.number.int({ min: 0, max: 45000 }),
    commissionGiven: faker.number.int({ min: 0, max: 30000 }),
    purchasePrice: faker.number.int({
      min: 800000,
      max: 8500000,
    }),

    // Hidden/filter columns
    document: faker.datatype.boolean({ probability: 0.92 }) ? 'yes' : 'no',
    town: randomTown,

    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent({ days: 90 }),
  } satisfies Purchase
})
