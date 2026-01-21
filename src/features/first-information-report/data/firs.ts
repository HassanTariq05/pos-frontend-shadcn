import { faker } from '@faker-js/faker'

// Fixed seed → consistent & reproducible data
faker.seed(67890)

export const firEntries = Array.from({ length: 500 }, () => {
  const date = faker.date.between({
    from: '2024-01-01',
    to: '2025-12-31',
  })

  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  // For transaction number - we'll make it look like real trx numbers
  const trxNo = `TRX-${faker.string.numeric(6)}-${date.getFullYear().toString().slice(2)}`

  // Some realistic account names
  const account = faker.helpers.arrayElement([
    'Cash in Hand',
    'Bank - HBL',
    'Bank - Meezan',
    'Petty Cash',
    'Accounts Receivable',
    'Customer - Ali Traders',
    'Supplier - Karachi Stationery',
    "Owner's Equity",
    'Sales Revenue',
    'Purchase Expense',
  ])

  const town = faker.helpers.arrayElement([
    'Karachi',
    'Hyderabad',
    'Sukkur',
    'Larkana',
    'Thatta',
    'Badin',
    'Mirpurkhas',
    'Tando Allahyar',
    'Nawabshah',
    'Khairpur',
  ])

  // Most transactions have either debit OR credit (not both)
  const isDebit = faker.datatype.boolean({ probability: 0.55 }) // slightly more debits

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
