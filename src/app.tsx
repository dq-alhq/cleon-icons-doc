import React from 'react'

import { Controller } from '@/components/controller.tsx'
import { Hero } from '@/components/hero.tsx'
import { Icons } from '@/components/icons.tsx'
import { Toaster } from '@/components/ui/sonner'
import _icons from '@/lib/icons.json'

export default function App() {
    const [size, setSize] = React.useState<'4' | '5' | '6' | '7'>('5')
    const [stroke, setStroke] = React.useState<'1' | '2'>('2')
    const [query, setQuery] = React.useState('')
    const [icons, setIcons] = React.useState(_icons.map((i) => i.name))
    React.useEffect(() => {
        if (!query) return setIcons(_icons.map((i) => i.name))
        setIcons(
            _icons
                .filter(
                    (i) =>
                        i.name.toLowerCase().includes(query?.toLowerCase()) ||
                        i.keywords.some((k) => k.includes(query?.toLowerCase()))
                )
                .map((i) => i.name)
        )
    }, [query])

    return (
        <>
            <Toaster />
            <Hero />
            <Controller
                size={size}
                stroke={stroke}
                setSize={setSize}
                setStroke={setStroke}
                query={query}
                setQuery={setQuery}
            />
            <Icons icons={icons} size={size} stroke={stroke} />
        </>
    )
}
