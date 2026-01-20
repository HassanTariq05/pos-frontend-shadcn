import { getRouteApi } from '@tanstack/react-router'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CashbookDialogs } from './components/cashbook-dialogs'
import { CashbookPrimaryButtons } from './components/cashbook-primary-buttons'
import { CashbookProvider } from './components/cashbook-provider'
import { CashbookTable } from './components/cashbook-table'
import { cashbookEntries } from './data/users'

const route = getRouteApi('/_authenticated/cashbook')

export function Cashbook() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <CashbookProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div className='flex flex-row items-center gap-2'>
            <h2 className='text-2xl font-bold tracking-tight'>Cashbook</h2>
            <Badge
              variant='outline'
              className={
                'h-6 border-teal-200 bg-teal-100/30 text-teal-900 capitalize dark:text-teal-200'
              }
            >
              Opening Balance: {formatCurrency(125000)}
            </Badge>
          </div>
          <CashbookPrimaryButtons />
        </div>
        <CashbookTable
          data={cashbookEntries}
          search={search}
          navigate={navigate}
        />
      </Main>

      <CashbookDialogs />
    </CashbookProvider>
  )
}
