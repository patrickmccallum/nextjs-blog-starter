import React from 'react'
import Image, {ImageProps} from 'next/image'
import {cn} from '@/lib/style-utils'

export function MdxImage(props: ImageProps) {
    return (
        <Image
            {...props}
            alt={props.alt}
        />
    )
}

interface MdxImageStyledProps extends Omit<ImageProps, 'className'> {
    hideCaption?: boolean
    rootClassName?: string
    imageClassName?: string
}

export function MdxImageStyled({
                                   hideCaption,
                                   rootClassName,
                                   imageClassName,
                                   ...props
                               }: MdxImageStyledProps) {
    return (
        <div
            className={cn(
                'relative flex w-full flex-col items-center gap-4',
                rootClassName,
            )}
        >
            <MdxImage
                placeholder={'blur'}
                fetchPriority={'low'}
                fill={true}
                {...props}
                className={cn(
                    'mx-auto rounded-lg border-8 border-muted shadow',
                    imageClassName,
                )}
            />
            {!hideCaption && (
                <p
                    className={
                        'max-w-sm text-center text-sm text-primary dark:text-primary-foreground'
                    }
                >
                    {props.alt}
                </p>
            )}
        </div>
    )
}
