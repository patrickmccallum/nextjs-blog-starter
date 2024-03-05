'use client'

import { TypographyP } from '@/components/typography'
import { useState } from 'react'

const FORTUNES = [
    'True love is just around the corner, but so is a mugger.',
    'In the next week you will meet your best friend, but they will also be your worst enemy.',
    'You will find a large sum of money, but it will be counterfeit.',
    'Every day is a new opportunity to get into a new kind of trouble.',
    'You will make a new friend, but they will be a bad influence.',
    "You'll crack the code to happiness, but you'll forget it immediately.",
    'You will find a new hobby, but it will be illegal.',
    "You'll invent a fascinating new recipe, but it will be inedible.",
    'A thrilling mystery is coming to your life, over a lost sock.',
    "Fame and fortune are within reach, if you're playing a video game.",
    "It's going to rain tomorrow 🌧️",
    "I'm tired now, no more fortunes.",
    'Ask again later.',
    '🤐',
    "Ok, let's run through it again...",
]

export const FortuneTeller = () => {
    const [fortune, setFortune] = useState<number>(0)

    const getFortune = () => {
        // Increment the fortunes index by 1 and loop, we don't set it "randomly"
        // here to avoid the same fortune being shown twice in a row.
        setFortune((prev) => (prev + 1) % FORTUNES.length)
    }

    return (
        <div>
            <TypographyP>Your lucky fortune is...</TypographyP>
            <div className="mt-2 flex max-w-sm gap-4 rounded-lg border-2 border-neutral-500 p-4 px-6 text-base">
                {/* Tabler icons */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 animate-pulse"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6.73 17.018a8 8 0 1 1 10.54 0" />
                    <path d="M5 19a2 2 0 0 0 2 2h10a2 2 0 1 0 0 -4h-10a2 2 0 0 0 -2 2z" />
                    <path d="M11 7a3 3 0 0 0 -3 3" />
                </svg>
                <div className="flex flex-col items-start gap-2">
                    <span>{FORTUNES[fortune]}</span>
                    <button
                        className="border-0 bg-transparent font-semibold underline decoration-dotted underline-offset-4 hover:decoration-solid"
                        onClick={getFortune}
                    >
                        Another!
                    </button>
                </div>
            </div>
        </div>
    )
}
