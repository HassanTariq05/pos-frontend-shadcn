import { getRouteApi } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { StocksProvider } from './components/stocks-provider'
import { StocksTable } from './components/stocks-table'
import { stocks } from './data/stocks'

const route = getRouteApi('/_authenticated/stocks')

export function Stocks() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <StocksProvider>
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
              <h2 className='text-2xl font-bold tracking-tight'>Stocks</h2>
              <Badge
                variant='outline'
                className={
                  'h-6 border-sky-300 bg-sky-200/40 text-sky-900 capitalize dark:text-sky-100'
                }
              >
                150
              </Badge>
            </div>

            <p className='text-muted-foreground'>Manage your stocks here.</p>
          </div>
        </div>
        <StocksTable data={stocks as any} search={search} navigate={navigate} />
      </Main>
    </StocksProvider>
  )
}
