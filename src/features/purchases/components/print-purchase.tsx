import { useRef } from 'react'
import { Printer } from 'lucide-react'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { PurchasesProvider } from './purchases-provider'

export function PrintPurchase() {
  const printRef = useRef<any>(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Purchase Invoice',
  } as any)

  const handlePrintSafe = () => {
    if (!printRef.current) {
      console.warn('Nothing to print – ref is null')
      return
    }
    handlePrint()
  }

  const saleData = {
    date: '2026-01-31',
    product: {
      productName: 'Tractor X',
      variantName: 'Model A',
      modelNumber: 'TX-1234',
      engineNumber: 'EN-5678',
      chassisNumber: 'CH-91011',
    },
    vendor: {
      accountName: 'Vendor ABC',
      contactNumber: '0300-1234567',
    },
    manualPage: 5,
    purchasePrice: 1500000,
    advancePrice: 500000,
    advanceDate: '2026-01-15',
    advanceNote: 'First installment',
    miscellaneouses: [
      { amount: 2000, note: 'Transport' },
      { amount: 1500, note: 'Documentation' },
    ],
    notes: 'Delivery expected within 2 weeks.',
    // commissions: [] // Commented out for now
  }

  return (
    <PurchasesProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-col gap-4'>
          <Button onClick={handlePrintSafe} className='self-end'>
            <Printer /> Print Invoice
          </Button>

          <div ref={printRef} className='print-only'>
            <Card>
              <CardHeader>
                <CardTitle className='text-center text-xl'>
                  Purchase Invoice
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Top info */}
                <div className='flex flex-wrap justify-between gap-4'>
                  <div>
                    <p>
                      <strong>Date:</strong>{' '}
                      {moment(saleData.date).format('DD-MM-YYYY')}
                    </p>
                    <p>
                      <strong>Tractor:</strong> {saleData.product.productName}{' '}
                      {saleData.product.variantName}
                    </p>
                    <p>
                      <strong>Model:</strong> {saleData.product.modelNumber}
                    </p>
                    <p>
                      <strong>Engine No:</strong>{' '}
                      {saleData.product.engineNumber}
                    </p>
                    <p>
                      <strong>Chassis No:</strong>{' '}
                      {saleData.product.chassisNumber}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Vendor:</strong> {saleData.vendor.accountName}
                    </p>
                    <p>
                      <strong>Customer Phone:</strong>{' '}
                      {saleData.vendor.contactNumber}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Manual Page:</strong> {saleData.manualPage}
                    </p>
                  </div>
                </div>

                {/* Purchase details */}
                <div>
                  <p>
                    <strong>Purchase Price:</strong> {saleData.purchasePrice}
                  </p>
                  <p>
                    <strong>Advance:</strong> {saleData.advancePrice}
                  </p>
                  <p>
                    <strong>Advance Date:</strong>{' '}
                    {moment(saleData.advanceDate).format('DD-MM-YYYY')}
                  </p>
                  <p>
                    <strong>Advance Note:</strong> {saleData.advanceNote}
                  </p>
                </div>

                {/* Commissions table */}
                {/* <div>
              <p className="font-bold mb-2">Commissions:</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Given</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {saleData.commissions.map((com, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{com.name}</TableCell>
                      <TableCell>{com.amount}</TableCell>
                      <TableCell>{com.commissionGiven}</TableCell>
                      <TableCell>{com.commissionRemaining}</TableCell>
                      <TableCell>{com.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div> */}

                {/* Miscellaneous table */}
                <div>
                  <p className='mb-2 font-bold'>Miscellaneous:</p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {saleData.miscellaneouses.map((misc, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{misc.amount}</TableCell>
                          <TableCell>{misc.note}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Notes */}
                <div>
                  <p>
                    <strong>Notes:</strong> {saleData.notes}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </PurchasesProvider>
  )
}
