import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(67890)

export const stocks = Array.from({ length: 500 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: faker.string.uuid(),
    manualPage: faker.number.hex({ min: 0, max: 65535 }),

    firstName,
    lastName,
    productName: faker.internet
      .username({ firstName, lastName })
      .toLocaleLowerCase(),
    variant: faker.number.bigInt(1000n),
    modelNumber: 2025,
    engineNumber: faker.string.ulid(),
    chassisNumber: faker.string.ulid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
