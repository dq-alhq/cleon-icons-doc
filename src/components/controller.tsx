import React from 'react'

import { ChevronDown } from 'cleon-icons'
import { useDebouncedCallback } from 'use-debounce'

import { ThemeToggle } from '@/components/theme-provider.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'
import { Input } from '@/components/ui/input.tsx'

export function Controller({
    size,
    setSize,
    stroke,
    setStroke,
    query,
    setQuery
}: {
    size: string
    setSize: React.Dispatch<React.SetStateAction<'4' | '5' | '6' | '7'>>
    stroke: string
    setStroke: React.Dispatch<React.SetStateAction<'1' | '2'>>
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
}) {
    const [search, setSearch] = React.useState<string>(query)

    const handleSearch = useDebouncedCallback(() => {
        setQuery(search)
    }, 500)

    React.useEffect(() => {
        handleSearch()
    }, [handleSearch, search])
    return (
        <div className='container my-10 flex flex-col lg:flex-row justify-between gap-4 items-center'>
            <Input
                name='search'
                aria-label='Search Icon'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type='search'
                className='lg:max-w-sm'
                placeholder='Search Icon ...'
            />
            <div className='flex flex-nowrap gap-4 w-full lg:justify-end'>
                <ThemeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='group flex-grow lg:flex-none lg:w-auto'>
                            Stroke {stroke}{' '}
                            <ChevronDown className='group-aria-expanded:rotate-180 transition-transform duration-300' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuRadioGroup value={stroke}>
                            <DropdownMenuRadioItem onSelect={() => setStroke('1')} value='1'>
                                Stroke 1
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem onSelect={() => setStroke('2')} value='2'>
                                Stroke 2
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='group flex-grow lg:flex-none lg:w-auto'>
                            Size {size}{' '}
                            <ChevronDown className='group-aria-expanded:rotate-180 transition-transform duration-300' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuRadioGroup value={size}>
                            <DropdownMenuRadioItem onSelect={() => setSize('4')} value='4'>
                                Size 4 (20px)
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem onSelect={() => setSize('5')} value='5'>
                                Size 5 (24px)
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem onSelect={() => setSize('6')} value='6'>
                                Size 6 (28px)
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem onSelect={() => setSize('7')} value='7'>
                                Size 7 (32px)
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
