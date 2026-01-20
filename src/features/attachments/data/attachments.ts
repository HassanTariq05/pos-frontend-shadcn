import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(67890)

export const attachments = Array.from({ length: 500 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  const randomDate = faker.date.between({
    from: '2023-01-01',
    to: new Date(), // today
  })

  return {
    id: faker.string.uuid(),

    firstName,
    lastName,
    name: faker.internet.username({ firstName, lastName }).toLocaleLowerCase(),
    note: faker.book.title(),
    date: randomDate,
    // updatedAt: faker.date.recent(),
  }
})
