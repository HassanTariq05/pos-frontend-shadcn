import { faker } from '@faker-js/faker'

// Fixed seed → consistent & reproducible data
faker.seed(67890)

export const firEntries = Array.from({ length: 500 }, () => {
  const date = faker.date.between({
    from: '2024-01-01',
    to: '2025-12-31',
  })

  const crimeNo = faker.number.int({ min: 500, max: 125000 })
  const policeStation = faker.company.name()
  const accused = faker.person.fullName()
  const complainant = faker.person.fullName()
  const witness = faker.person.fullName()

  return {
    date: date.toISOString().split('T')[0],
    crimeNo,
    accused,
    complainant,
    witness,
    policeStation,
  }
})
