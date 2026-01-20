import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { BusinessAccountDialogs } from './components/business-account-dialogs'
import { BusinessAccountPrimaryButtons } from './components/business-account-primary-buttons'
import { BusinessAccountsProvider } from './components/business-accounts-provider'
import { CustomerAccounts } from './components/customer/customer-accounts'
import { OwnerAccounts } from './components/owner/owner-accounts'
import { RentalAccounts } from './components/rental/rental-accounts'
import { Towns } from './components/town/towns'
import { VendorAccounts } from './components/vendor/vendor-accounts'
import {
  ownerAccounts,
  townssData,
  vendorsData,
} from './data/accounts-mock-data'

export function BusinessAccounts() {
  const [selectedTab, setSelectedTab] = useState<string>('owners')

  const [searchKeyword, setSearchKeyword] = useState<string | null>(null)

  return (
    <BusinessAccountsProvider>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div className='flex flex-row items-center gap-2'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Business Accounts
            </h2>
          </div>
          <BusinessAccountPrimaryButtons selectedTab={selectedTab} />
        </div>
        <Tabs
          orientation='vertical'
          value={selectedTab}
          onValueChange={(val) => setSelectedTab(val)}
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='owners'>Owners</TabsTrigger>
              <TabsTrigger value='vendors'>Vendors</TabsTrigger>
              <TabsTrigger value='customers'>Customers</TabsTrigger>
              <TabsTrigger value='rentals'>Rentals</TabsTrigger>
              <TabsTrigger value='towns'>Towns</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='owners' className='space-y-4'>
            <OwnerAccounts
              data={ownerAccounts}
              page={0}
              pageSize={10}
              totalPages={10}
              onPageChange={() => {}}
              onPageSizeChange={() => {
                1
              }}
              loading={false}
              setSearchKeyword={setSearchKeyword}
            />
          </TabsContent>

          <TabsContent value='vendors' className='space-y-4'>
            <VendorAccounts
              data={vendorsData}
              page={0}
              pageSize={10}
              totalPages={10}
              onPageChange={() => {}}
              onPageSizeChange={() => {
                1
              }}
              loading={false}
              setSearchKeyword={setSearchKeyword}
            />
          </TabsContent>

          <TabsContent value='customers' className='space-y-4'>
            <CustomerAccounts
              data={vendorsData}
              page={0}
              pageSize={10}
              totalPages={10}
              onPageChange={() => {}}
              onPageSizeChange={() => {
                1
              }}
              loading={false}
              setSearchKeyword={setSearchKeyword}
            />
          </TabsContent>

          <TabsContent value='towns' className='space-y-4'>
            <Towns
              data={townssData}
              page={0}
              pageSize={10}
              totalPages={10}
              onPageChange={() => {}}
              onPageSizeChange={() => {
                1
              }}
              loading={false}
              setSearchKeyword={setSearchKeyword}
            />
          </TabsContent>

          <TabsContent value='rentals' className='space-y-4'>
            <RentalAccounts
              data={ownerAccounts}
              page={0}
              pageSize={10}
              totalPages={10}
              onPageChange={() => {}}
              onPageSizeChange={() => {
                1
              }}
              loading={false}
              setSearchKeyword={setSearchKeyword}
            />
          </TabsContent>

          {/* <TabsContent value='checklists' className='space-y-4'>
            <Checklists
              data={[]}
              page={0}
              pageSize={10}
              totalPages={10}
              onPageChange={() => {}}
              onPageSizeChange={() => {}}
              loading={false}
              setSearchKeyword={setSearchKeyword}
            />
          </TabsContent>

          <TabsContent value='policies' className='space-y-4'>
            <Policies
              data={[]}
              page={0}
              pageSize={10}
              totalPages={10}
              onPageChange={() => {}}
              onPageSizeChange={() => {}}
              loading={false}
              setSearchKeyword={setSearchKeyword}
            />
          </TabsContent> */}
        </Tabs>
      </Main>

      <BusinessAccountDialogs />
      {/* <ChecklistsDialogs />
      <PoliciesDialogs /> */}
    </BusinessAccountsProvider>
  )
}
