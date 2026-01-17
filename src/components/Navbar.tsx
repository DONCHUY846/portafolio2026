import { useEffect, useState } from 'react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const MENU_ITEMS = [
  { label: 'PROYECTOS', href: '#projects' },
  { label: 'SOBRE MÍ', href: '#about' },
  { label: 'CONTACTO', href: '#contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousOverflow || ''
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between p-6 mix-blend-difference text-white">
        <span className="font-mono text-xs tracking-[0.3em] uppercase">
          [ DEV_PORTFOLIO_V1 ]
        </span>

        <SheetTrigger asChild>
          <button
            type="button"
            aria-label={
              open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
            }
            aria-expanded={open}
            aria-controls="main-menu"
            className="font-mono text-sm uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-foreground"
          >
            {open ? '[ CERRAR ]' : '[ MENÚ ]'}
          </button>
        </SheetTrigger>
      </nav>

      <SheetContent
        side="top"
        className={cn(
          'fixed inset-0 z-40 flex h-full w-full flex-col items-center justify-center bg-ink p-6 text-off-white',
          'data-[state=open]:duration-700 data-[state=closed]:duration-500',
        )}
      >
        <div
          id="main-menu"
          className={cn(
            'relative flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-3 text-center',
            open && 'menu-open',
          )}
        >
          {MENU_ITEMS.map((item, index) => (
            <div key={item.href} className="overflow-hidden">
              <SheetClose asChild>
                <a
                  href={item.href}
                  className="menu-reveal block font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </a>
              </SheetClose>
            </div>
          ))}
        </div>

        <SheetClose asChild>
          <button
            type="button"
            aria-label="Cerrar menú de navegación"
            className="absolute right-6 top-6 font-mono text-xs uppercase tracking-[0.3em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:ring-off-white"
          >
            [ CERRAR ]
          </button>
        </SheetClose>

        <div className="absolute bottom-10 left-0 right-0 flex w-full justify-between px-6 font-mono text-[0.65rem] uppercase text-muted-foreground">
          <span>Based in Mexico City</span>
          <span>Scroll to explore</span>
          <span>© 2024</span>
        </div>
      </SheetContent>
    </Sheet>
  )
}
