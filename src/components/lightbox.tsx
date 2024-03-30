'use client'

import { cloneElement, ReactElement, useEffect, useState } from 'react'
import { cn } from '@/lib/style-utils'
import Image from 'next/image'
import Link from 'next/link'

interface LightboxProps {
    imageUrl: string
    caption?: string
    popupRootClassName?: string
}

export const Lightbox = ({
    children,
    ...props
}: LightboxProps & { children: ReactElement }) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [transitionFrom, setTransitionFrom] = useState<{
        x: number
        y: number
    }>({
        x: 0,
        y: 0,
    })
    const [isHovered, setIsHovered] = useState(false)

    return (
        <>
            {children &&
                cloneElement(children, {
                    onClick: (e: any) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        setTransitionFrom({
                            x: rect.x + rect.width / 2,
                            y: rect.y + rect.height / 2,
                        })

                        setIsLightboxOpen(true)
                    },
                    onMouseEnter: () => setIsHovered(true),
                    onMouseLeave: () => setIsHovered(false),
                    style: {
                        ...children.props?.style,
                        transition: 'transform 100ms linear',
                        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                        cursor: 'pointer',
                        willChange: 'transform',
                    },
                })}
            <LightboxContent
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                transitionFrom={transitionFrom}
                {...props}
            />
        </>
    )
}

interface LightboxInnerProps extends LightboxProps {
    isOpen: boolean
    onClose: () => void
    transitionFrom: { x: number; y: number }
}

const LightboxContent = ({
    imageUrl,
    caption,
    popupRootClassName,
    isOpen,
    onClose,
}: LightboxInnerProps) => {
    useEffect(() => {
        if (!isOpen) {
            return
        }

        const escapeKeyExit = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        addEventListener('keydown', escapeKeyExit)

        document.documentElement.style.overflow = 'hidden'

        return () => {
            removeEventListener('keydown', escapeKeyExit)
            document.documentElement.style.overflow = 'auto'
        }
    }, [isOpen, onClose])
    return (
        <div
            className={cn(
                'fixed inset-0 z-50 flex items-center justify-center',
                'transition-opacity duration-300',
                {
                    'pointer-events-none opacity-0': !isOpen,
                    'pointer-events-auto opacity-100': isOpen,
                },
                popupRootClassName,
            )}
            style={{
                willChange: 'opacity',
            }}
        >
            <div
                className="fixed inset-0 bg-black bg-opacity-80"
                onClick={onClose}
            />
            <div
                className="relative inset-0 flex h-screen w-screen items-center justify-center transition-all duration-200"
                onClick={onClose}
            >
                <div
                    className={
                        'relative h-full w-full select-none transition-all duration-200'
                    }
                    style={{
                        transform: isOpen ? `scale(1)` : `scale(0)`,
                        transformOrigin: `center`,
                        willChange: 'transform',
                    }}
                >
                    <Image
                        src={imageUrl}
                        alt={caption ?? 'A photo'}
                        className={cn(
                            'm-auto h-full max-h-[70%] w-full max-w-[70%]',
                        )}
                        fill={true}
                        style={{
                            aspectRatio: '1/1',
                            objectFit: 'contain',
                            objectPosition: 'center',
                        }}
                    />
                </div>
                {caption && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                            'flex flex-col items-center justify-between gap-6 md:flex-row',
                            'absolute bottom-0 left-0 right-0',
                            'mx-auto max-w-prose',
                            'translate-y-[100%] rounded-t-md bg-black bg-opacity-50 p-4 px-6',
                            'text-white transition duration-150',
                            {
                                'translate-y-0': isOpen,
                            },
                        )}
                    >
                        <span className={'flex items-center gap-5 text-base'}>
                            {caption}
                        </span>
                        <div className={'w-full md:w-auto'}>
                            <Link
                                href={imageUrl}
                                target={'_blank'}
                            >
                                <button
                                    className={
                                        'w-full whitespace-nowrap rounded-md border-none bg-white p-2 px-6 text-base text-black md:w-auto'
                                    }
                                >
                                    🔍 Expand
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
