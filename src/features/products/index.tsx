import { getRouteApi } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ProductsDialogs } from './components/products-dialogs'
import { ProductsPrimaryButtons } from './components/products-primary-buttons'
import { ProductsProvider } from './components/products-provider'
import { ProductsTable } from './components/products-table'
import { products } from './data/products'

const route = getRouteApi('/_authenticated/products')

export function Products() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <ProductsProvider>
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
              <h2 className='text-2xl font-bold tracking-tight'>Products</h2>
              <Badge
                variant='outline'
                className={
                  'h-6 border-sky-300 bg-sky-200/40 text-sky-900 capitalize dark:text-sky-100'
                }
              >
                150
              </Badge>
            </div>

            <p className='text-muted-foreground'>Manage your products here.</p>
          </div>
          <ProductsPrimaryButtons />
        </div>
        <ProductsTable
          data={products as any}
          search={search}
          navigate={navigate}
        />
      </Main>

      <ProductsDialogs />
    </ProductsProvider>
  )
}
