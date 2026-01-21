import { useState } from 'react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { cn } from '@/lib/utils'

const MENU_ITEMS = [
  { label: 'PROYECTOS', href: '#projects' },

  { label: 'SOBRE MÍ', href: '#about' },

  { label: 'CONTACTO', href: '#contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={false}>
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between p-6 mix-blend-difference text-white">
        <span className="font-mono text-sm tracking-widest uppercase">
          [ PORTFOLIO 2026 ]
        </span>

        <SheetTrigger asChild>
          <button className="font-mono text-sm hover:line-through decoration-2 uppercase focus:outline-none">
            {open ? '[ CERRAR ]' : '[ MENÚ ]'}
          </button>
        </SheetTrigger>
      </nav>

      <SheetContent
        side="top"
        className={cn(
          'fixed inset-0 z-40 flex h-full w-full flex-col items-center justify-center bg-ink p-6 text-off-white border-none outline-none [&>button]:hidden',

          'transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-full',
        )}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

        <div
          id="main-menu"
          className={cn(
            'relative flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-3 text-center',

            open && 'menu-open',
          )}
        >
          {MENU_ITEMS.map((item, index) => (
            <div key={item.href} className="overflow-hidden">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="menu-reveal block font-display text-[12vw] md:text-[8vw] leading-[0.9] text-off-white hover:text-transparent hover:outline-text transition-all duration-300 uppercase tracking-tighter"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item.label}
              </a>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
