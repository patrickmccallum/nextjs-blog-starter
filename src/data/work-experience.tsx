import { ReactElement } from 'react'

type Job = {
    title: string
    company: string
    url: string
    start: Date
    end?: Date
    description: ReactElement | string
}

export const workExperience: Array<Job> = [
    {
        title: 'Chief Triangle Engineer',
        company: 'Vercel',
        url: 'https://vercel.com',
        start: new Date('2020-01-01'),
        description:
            'I make the triangles at Vercel whenever we need one done in CSS.',
    },
    {
        title: 'Senior Software Engineer',
        company: 'Netflix',
        url: 'https://netflix.com',
        start: new Date('2019-01-01'),
        end: new Date('2020-01-01'),
        description: "I invented the binge watch feature, you're welcome.",
    },
    {
        title: 'Software Engineer',
        company: 'Google',
        url: 'https://google.com',
        start: new Date('2018-01-01'),
        end: new Date('2019-01-01'),
        description: 'Im also the real inventor of Google+, I swear.',
    },
    {
        title: 'Junior Software Engineer',
        company: 'Google',
        url: 'https://google.com',
        start: new Date('2017-01-01'),
        end: new Date('2018-01-01'),
        description:
            "Im the real inventor of the page algorithm, don't let anyone tell you otherwise.",
    },
]
