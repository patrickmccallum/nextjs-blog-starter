# Next Blog Stater

Hello! This is a starter site for a NextJS blog. It's been built to use MDX,
Tailwind, and the App router. It's incredibly quick and easy to get started and
change it to fit your purposes.

Have a look at the [demo site here](https://nextjs-blog-starter-mu.vercel.app/), and read the
accompanying [blog post over here](https://patsnacks.com/blog/building-nextjs-blog-2024).

Out of the box it supports:

- 👨‍💻 MDX (with examples)
- ⏳ Auto releasing articles in the future
- 🔍 SEO and OpenGraph tags with OG examples
- 🏷️ Tagging posts and exploring by tags
- 🐦 Sharing posts on Twitter
- 🌕 Dark mode
- 💼 Work experience
- 📸 Photos example, with lightbox!
- 💭 Opinionated prettier setup

It's been licensed under MIT, so feel free to use it for whatever you like.

If you have questions, feel free to reach out to me on Twitter @patsnacks or
open an issue on this repo... or even better, submit a PR!

## Getting started

To get started, clone this repository...

```bash
git clone https://github.com/patrickmccallum/nextjs-blog-starter
```

Then install the dependencies...

```bash
cd next-blog-starter
npm install
```

To run the development server...

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to
see the result.

## Next steps

Once you have your site up and running, you'll want to start customizing it.

- Change the header and footer in `src/app/template.tsx`
- Add a new blog post under `src/app/blog`, try just copying and pasting an
  existing one and changing the content for the first try.
- Publish your site to Vercel, Netlify, or wherever you like. There are step-by-step
  instructions in the blog post.

## FAQ

### How do I add a new post?

Put a new directory/page under the `app/blog/` directory. The directory name will be your slug. For quick blogging, just
copy and paste the `my-first-post` directory.

### What is metadata.json?

A file to quickly and easily expose data to search engines about your blog post. It's used in the `BlogLayout` component
to populate the OpenGraph tags.

### I don't like how it looks...

Good! It's a starter site after all. It's using very minimal styling built with tailwind css, this is the perfect chance
to make it your own.

### How do I change the work experience?

The work experience is in `src/app/work-experience.tsx`. It's a simple array of objects that are rendered in
the `WorkExperience` component and on the `/work` page, from there you can also edit your LinkedIn URL (if you have
one).

## Contributing

Contributions are highly welcome, and I'm happy to help you get started.

Just open a pull request or issue to start the conversation.

## Feature requests and future updates

My plan is to update this repo as Next releases updates and new features.

If you have any feature requests or ideas, feel free to open an issue.

Thanks for your interest. :)
