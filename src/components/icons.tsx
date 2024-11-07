import React from 'react'

import * as CleonIcons from 'cleon-icons'
import { renderToString } from 'react-dom/server'

import {
    copyJsxSvgToClipboard,
    copyJsxToClipboard,
    copySvgToClipboard,
    downloadPng,
    downloadSvg
} from '@/components/handle-copy.tsx'
import { Icon } from '@/components/icon.tsx'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'
import { Tooltip } from './tooltip'

interface IconsProps {
    icons: string[]
    size: '4' | '5' | '6' | '7'
    stroke: '1' | '2'
}

export function Icons({ icons, size, stroke }: IconsProps) {
    return (
        <div className='container'>
            <div className='flex flex-wrap gap-2'>
                {icons.map((icon, i) => (
                    <IconComponent key={i} name={icon as keyof typeof CleonIcons} size={size} stroke={stroke} />
                ))}
            </div>
        </div>
    )
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: keyof typeof CleonIcons
    size: '4' | '5' | '6' | '7'
    stroke: '1' | '2'
}

const IconComponent = ({ name, size, stroke }: IconProps) => {
    const svgIcon = renderToString(<Icon icon={name} className={`size-${size}`} />).replace(
        'stroke-width="2"',
        `stroke-width="${stroke}"`
    )
    return (
        <Tooltip tooltip={name}>
            <DropdownMenu>
                <DropdownMenuTrigger
                    dangerouslySetInnerHTML={{ __html: svgIcon }}
                    className='bg-transparent focus:outline-none transition flex items-center justify-center cursor-pointer hover:bg-muted aria-expanded:ring-2 aria-expanded:ring-primary size-10 rounded-lg'
                />
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onSelect={() =>
                            copySvgToClipboard({
                                name: name,
                                size: size,
                                stroke: stroke
                            })
                        }
                    >
                        <CleonIcons.IconFileCode /> Copy SVG
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() =>
                            copyJsxSvgToClipboard({
                                name: name,
                                size: size,
                                stroke: stroke
                            })
                        }
                    >
                        <CleonIcons.IconBrandReact /> Copy JSX
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => copyJsxToClipboard(name)}>
                        <CleonIcons.IconCopy /> Copy Name
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => downloadSvg(svgIcon, name)}>
                        <CleonIcons.IconDownload />
                        Download SVG
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={async () => await downloadPng(svgIcon, name)}>
                        <CleonIcons.IconDownload />
                        Download PNG
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Tooltip>
    )
}
