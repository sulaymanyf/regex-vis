import { memo } from 'react'
import { Link, NavLink } from 'react-router-dom'


import clsx from 'clsx'




import { useTranslation } from 'react-i18next'




import { GitHubLogoIcon } from '@radix-ui/react-icons'




import { LanguageSelect } from '@/components/language-select'


import { ModeToggle } from '@/components/mode-toggle'


import { Logo } from '@/components/logo'

function navLinkClassName({ isActive }: { isActive: boolean }) {






  return clsx('transition-colors hover:text-foreground/80 text-sm', isActive ? 'text-foreground' : 'text-foreground/60')




}

const Header = memo(() => {
  const { t } = useTranslation()


  return (
    <header className="h-[64px] flex items-center justify-between border-b">




      <div className="flex items-center space-x-6">


        <Link to="/" className="ml-9 pr-2">




          <div className="flex items-center">


            <Logo width={32} height={32} className="mr-4" />






            <span className="font-bold">Regex Vis</span>



          </div>
        </Link>
        <NavLink
          to="/"
          className={navLinkClassName}



        >
          {t('Home')}
        </NavLink>
        <NavLink
          to="/samples"
          className={navLinkClassName}



        >
          {t('Samples')}
        </NavLink>
      </div>
      <div className="flex items-center text-sm mr-9 space-x-2">






        <LanguageSelect />
    
        <ModeToggle />
      </div>
    </header>
  )
})

export default Header





























