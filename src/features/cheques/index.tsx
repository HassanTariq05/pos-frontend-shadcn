import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ChequeDialogs } from './components/cheque-dialogs'
import { ChequePrimaryButtons } from './components/cheque-primary-buttons'
import { ChequeProvider } from './components/cheque-provider'
import { ChequeTable } from './components/cheque-table'
import { chequeEntries } from './data/cheques'

const route = getRouteApi('/_authenticated/cheques')

export function Cheques() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <ChequeProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Cheques</h2>
          </div>
          <ChequePrimaryButtons />
        </div>
        <ChequeTable data={chequeEntries} search={search} navigate={navigate} />
      </Main>

      <ChequeDialogs />
    </ChequeProvider>
  )
}
