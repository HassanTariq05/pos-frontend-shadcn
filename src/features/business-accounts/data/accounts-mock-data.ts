import { faker } from '@faker-js/faker'

faker.seed(67890)

export type BusinessAccount = {
  id: string
  title: string
  description: string
  phone: string
  debit: number
  credit: number
  balance: number
  status: 'Active' | 'Inactive' | 'Blocked'
}

export type VendorAccount = {
  id: string
  account: string
  title: string
  urduName: string
  town: string
  phone: string
  openingBalance: number
  credit: number
  debit: number
  balance: number
  status: 'Active' | 'Inactive' | 'Blocked'
}

export type Town = {
  id: string
  title: string
}

export const ownerAccounts: BusinessAccount[] = Array.from(
  { length: 10 },
  () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    const debit = faker.number.int({ min: 0, max: 250_000 })
    const credit = faker.number.int({ min: 0, max: 250_000 })

    const balance = debit - credit

    return {
      id: faker.string.uuid(),

      title: `${firstName} ${lastName}`,

      description: faker.helpers.arrayElement([
        'Primary business owner',
        'Silent partner',
        'Capital investor',
        'Managing owner',
        'Equity holder',
        'Senior stakeholder',
        'Founding member',
      ]),

      phone: faker.phone.number(),

      debit,
      credit,

      balance,

      status: faker.helpers.arrayElement([
        'Active',
        'Active',
        'Active', // weighted toward Active
        'Inactive',
        'Blocked',
      ]),
    }
  }
)

export const vendorsData: VendorAccount[] = Array.from(
  { length: 10 },
  (_, index) => {
    const debit = faker.number.int({ min: 0, max: 200_000 })
    const credit = faker.number.int({ min: 0, max: 200_000 })
    const openingBalance = faker.number.int({ min: 0, max: 150_000 })

    const balance = openingBalance + debit - credit

    return {
      id: faker.string.uuid(),

      account: `V-${String(index + 1).padStart(4, '0')}`,

      title: faker.company.name(),

      urduName: faker.helpers.arrayElement([
        'علی ٹریڈرز',
        'خان اینڈ سنز',
        'احمد سپلائرز',
        'رحمان کارپوریشن',
        'یوسف برادرز',
        'المدینہ اسٹور',
      ]),

      town: faker.location.city(),

      phone: faker.phone.number(),

      openingBalance,

      debit,
      credit,

      balance,

      status: faker.helpers.arrayElement([
        'Active',
        'Active',
        'Inactive',
        'Blocked',
      ]),
    }
  }
)

export const townssData: Town[] = Array.from({ length: 10 }, (_) => {
  return {
    id: faker.string.uuid(),
    title: faker.location.city(),
  }
})
