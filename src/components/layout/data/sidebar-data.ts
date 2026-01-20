import {
  Construction,
  LayoutDashboard,
  Monitor,
  Bug,
  ListTodo,
  FileX,
  HelpCircle,
  Lock,
  Bell,
  Package,
  Palette,
  ServerOff,
  Settings,
  Wrench,
  UserCog,
  UserX,
  Users,
  MessagesSquare,
  ShieldCheck,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  BookOpen,
  ScrollText,
  Paperclip,
  Receipt,
  ShieldAlert,
  Box,
  CirclePile,
  PackagePlus,
  BadgeDollarSign,
  HandCoins,
  FileText,
} from 'lucide-react'
import { ClerkLogo } from '@/assets/clerk-logo'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: ListTodo,
        },
        {
          title: 'Apps',
          url: '/apps',
          icon: Package,
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: MessagesSquare,
        },
        {
          title: 'Users',
          url: '/users',
          icon: Users,
        },
        {
          title: 'Secured by Clerk',
          icon: ClerkLogo,
          items: [
            {
              title: 'Sign In',
              url: '/clerk/sign-in',
            },
            {
              title: 'Sign Up',
              url: '/clerk/sign-up',
            },
            {
              title: 'User Management',
              url: '/clerk/user-management',
            },
          ],
        },
      ],
    },
    {
      title: 'General Payments',
      items: [
        {
          title: 'CashBook',
          url: '/cashbook',
          icon: BookOpen,
        },
        {
          title: 'General Journal',
          url: '/general-journal',
          icon: ScrollText,
        },
      ],
    },

    {
      title: 'Accounts',
      items: [
        {
          title: 'General Accounts',
          url: '/general-accounts',
          icon: UserCog,
        },
        {
          title: 'Business Accounts',
          url: '/business-accounts',
          icon: Users,
        },
      ],
    },

    {
      title: 'Inventory',
      items: [
        {
          title: 'Products',
          url: '/products',
          icon: Box,
        },
        {
          title: 'Stocks',
          url: '/stocks',
          icon: CirclePile,
        },
      ],
    },

    {
      title: 'Transactions',
      items: [
        {
          title: 'Purchases',
          url: '/purchases',
          icon: PackagePlus,
        },
        {
          title: 'Sales',
          url: '/sales',
          icon: BadgeDollarSign,
        },
        {
          title: 'Due Payments',
          url: '/due-payments',
          icon: HandCoins,
        },
      ],
    },

    {
      title: 'Others',
      items: [
        {
          title: 'Attachments',
          url: '/attachments',
          icon: Paperclip,
        },
        {
          title: 'Cheques',
          url: '/cheques',
          icon: Receipt,
        },
        {
          title: 'FIR',
          url: '/first-information-report',
          icon: ShieldAlert,
        },
        {
          title: 'Reports',
          url: '/reports',
          icon: FileText,
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: ShieldCheck,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: Bug,
          items: [
            {
              title: 'Unauthorized',
              url: '/errors/unauthorized',
              icon: Lock,
            },
            {
              title: 'Forbidden',
              url: '/errors/forbidden',
              icon: UserX,
            },
            {
              title: 'Not Found',
              url: '/errors/not-found',
              icon: FileX,
            },
            {
              title: 'Internal Server Error',
              url: '/errors/internal-server-error',
              icon: ServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/errors/maintenance-error',
              icon: Construction,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
