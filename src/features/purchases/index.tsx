import { getRouteApi } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { PurchasesDialogs } from './components/purchases-dialogs'
import { PurchasesPrimaryButtons } from './components/purchases-primary-buttons'
import { PurchasesProvider } from './components/purchases-provider'
import { PurchasesTable } from './components/purchases-table'
import { purchases } from './data/purchases'

const route = getRouteApi('/_authenticated/purchases')

export function Purchases() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

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
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <div className='flex flex-row items-center gap-4'>
              <h2 className='text-2xl font-bold tracking-tight'>Purchases</h2>
              <Badge
                variant='outline'
                className={
                  'h-6 border-sky-300 bg-sky-200/40 text-sky-900 capitalize dark:text-sky-100'
                }
              >
                150
              </Badge>
            </div>

            <p className='text-muted-foreground'>Manage your purchases here.</p>
          </div>
          <PurchasesPrimaryButtons />
        </div>
        <PurchasesTable
          data={purchases as any}
          search={search}
          navigate={navigate}
        />
      </Main>

      <PurchasesDialogs />
    </PurchasesProvider>
  )
}
