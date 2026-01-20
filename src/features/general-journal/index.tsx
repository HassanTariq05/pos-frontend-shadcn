import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { JournalDialogs } from './components/journal-dialogs'
import { JournalPrimaryButtons } from './components/journal-primary-buttons'
import { JournalProvider } from './components/journal-provider'
import { JournalTable } from './components/journal-table'
import { journalEntries } from './data/users'

const route = getRouteApi('/_authenticated/general-journal')

export function GeneralJournal() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <JournalProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>
              General Journal
            </h2>
          </div>
          <JournalPrimaryButtons />
        </div>
        <JournalTable
          data={journalEntries}
          search={search}
          navigate={navigate}
        />
      </Main>

      <JournalDialogs />
    </JournalProvider>
  )
}
