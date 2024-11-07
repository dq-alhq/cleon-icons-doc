import React from 'react'

import { Check, Copy, IconBrandBun, IconBrandNpm, IconBrandPnpm, IconBrandYarn } from 'cleon-icons'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button.tsx'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'
import { cn, wait } from '@/lib/utils'

interface CLIProps {
    items?: string | string[]
    command: 'init' | 'add' | 'install'
    className?: string
}

export const CLI = ({ items, command = 'init', className }: CLIProps) => {
    const getCommand = (pm: string) => {
        const item = typeof items === 'string' ? items : items?.join(' ')
        switch (pm) {
            case 'bun':
                return command === 'init'
                    ? 'bunx cleon init'
                    : command === 'add'
                      ? `bunx cleon add ${item}`
                      : `bun add ${item}`
            case 'yarn':
                return command === 'init'
                    ? 'npx cleon init'
                    : command === 'add'
                      ? `npx cleon add ${item}`
                      : `yarn add ${item}`
            case 'pnpm':
                return command === 'init'
                    ? 'pnpm dlx cleon init'
                    : command === 'add'
                      ? `pnpm dlx cleon add ${item}`
                      : `pnpm add ${item}`
            case 'npm':
            default:
                return command === 'init'
                    ? 'npx cleon init'
                    : command === 'add'
                      ? `npx cleon add ${item}`
                      : `npm i ${item}`
        }
    }

    const [cli, setCli] = React.useState(getCommand('npm'))
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async (pm: string) => {
        setCli(getCommand(pm))
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(cli)
            setCopied(true)
            wait(2000).then(() => setCopied(false))
        } else {
            toast.error('Failed to copy to clipboard')
        }
    }

    return (
        <section className='space-y-2'>
            <div
                className={cn(
                    'text-foreground bg-background font-mono gap-4 text-sm border flex items-center justify-between p-3 rounded-lg w-full h-10',
                    className
                )}
            >
                {cli}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='icon' className='size-8 -mr-2'>
                            <Copy
                                className={cn(
                                    'h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all',
                                    copied && 'rotate-90 scale-0'
                                )}
                            />
                            <Check
                                className={cn(
                                    'absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all',
                                    copied && 'rotate-0 scale-100'
                                )}
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem onSelect={() => handleCopy('npm')}>
                            <IconBrandNpm />
                            NPM
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleCopy('bun')}>
                            <IconBrandBun />
                            Bun
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleCopy('yarn')}>
                            <IconBrandYarn />
                            Yarn
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleCopy('pnpm')}>
                            <IconBrandPnpm />
                            PNPM
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </section>
    )
}
