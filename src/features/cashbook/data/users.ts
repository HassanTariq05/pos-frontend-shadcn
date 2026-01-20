import { faker } from '@faker-js/faker'

// Fixed seed → consistent & reproducible data
faker.seed(67890)

export const cashbookEntries = Array.from({ length: 500 }, () => {
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

  const amount = faker.number.int({ min: 500, max: 125000 })

  return {
    date: date.toISOString().split('T')[0], // YYYY-MM-DD format
    trxNo,
    firstName,
    lastName, // kept for full name generation in table
    account,
    town,
    particular: faker.helpers.arrayElement([
      'Cash sales',
      'Payment received from customer',
      'Bank deposit',
      'Cash withdrawal for expenses',
      'Payment to supplier',
      'Salary paid',
      'Utility bill payment',
      'Purchase of stationery',
      'Rent payment',
      'Cash purchase of goods',
      'Customer refund',
      'Bank charges',
      'Miscellaneous expense',
      'Advance to staff',
      'Receipt from transport',
    ]),
    debit: isDebit ? amount : 0,
    credit: !isDebit ? amount : 0,
  }
})
