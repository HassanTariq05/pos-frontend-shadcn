import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { FirDialogs } from './components/fir-dialogs'
import { FirPrimaryButtons } from './components/fir-primary-buttons'
import { FirProvider } from './components/fir-provider'
import { FirTable } from './components/fir-table'
import { firEntries } from './data/firs'

const route = getRouteApi('/_authenticated/first-information-report')

export function FirstInformationReport() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <FirProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>FIRs</h2>
          </div>
          <FirPrimaryButtons />
        </div>
        <FirTable data={firEntries} search={search} navigate={navigate} />
      </Main>

      <FirDialogs />
    </FirProvider>
  )
}
