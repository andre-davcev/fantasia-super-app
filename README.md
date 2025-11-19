# Fantasia

This is my personal sandbox project which you can find at [andredavcev.com](https://andredavcev.com/). Fantasia comes from one of my favorite movies as a kid [The Neverending Story](<https://en.wikipedia.org/wiki/The_NeverEnding_Story_(film)>). Over the years this project should evolve and become my creative outlet.

## Technology Stack

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx). Every push to the master branch triggers continuous integration using [Github Actions](https://github.com/features/actions). This Angular application is currently on version 14 and utilizes various TypeScript libraries. [RxJS](https://rxjs.dev/) is used extensively throughout the code and am using [NGXS](https://ngxs.gitbook.io/ngxs) for state management.

## Quick Start & Documentation

Although this is a personal project, you should be able to replicate my environment quite easily. Simply clone my repository `git clone https://github.com/andre-davcev/sandbox.git` and then run `npm i` inside the repository folder (assuming you have npm installed globally).

## Running Fantasia locally

Run `npm run fan-serve`. Then navigate to (localhost:4201)[http://localhost:4201/]. Enjoy!

## Thanks for checking out my code!

# Taskmaster (Angular Spring Boot)

Spring Boot application setup with Postgres backend and Angular front end

## Setup

1. [Download](https://www.docker.com/products/docker-desktop/) Docker Desktop
2. [Download](https://nodejs.org/en/download) Node.js
3. Pull and run official `docker-postgres` image: `npm run postgres-download`

## Spring Boot: Run

1. Start local postgres container: `npm run postgres-start`
2. Run Java api: `npm run taskmaster-boot-run` (Requires application.yml db connect change)
3. Run Angular front end: `npm run taskmaster-angular-serve`
4. When finished shutdown postgres: `npm run postgres-stop`

## Fat JAR: Run

1. Start local postgres container: `npm run postgres-start`
2. Package api as jar: `npm run taskmaster-boot-package`
3. Run api as jar: `npm run taskmaster-boot-run-jar`
4. Run Angular front end: `npm run taskmaster-angular-serve`
5. When finished shutdown postgres: `npm run postgres-stop`

## Docker: Run

1. Build Docker: `npm run taskmaster-docker-build`
2. Run Docker compose: `npm run taskmaster-docker-run`
3. When finished shutdown image: `npm run taskmaster-docker-stop`

## Docker: Debug

1. Shell into API: `npm run taskmaster-docker-shell-api`
2. Shell into DB: `npm run taskmaster-docker-shell-db`
3. Shell into FE: `npm run taskmaster-docker-shell-fe`

## Jupyter Notebooks Setup

1. Open up the `Command Palette`
2. Select `Python: Create Environment...`
3. Select `Venv` or `Conda`
4. Select the `ipykernel` to install in your local environment

# Supabase: Docker Setup

1. Follow steps for [Self Hosting Guide](https://supabase.com/docs/guides/self-hosting/docker)
2. Copy steps should be put in `docker/supabase`

## Supabase: Run

1. Run Supabase: `npm run supabase-run`
2. Check services: `npm run supabase-services`
3. Navigate to [localhost:8000](http://localhost:8000/)
4. Stop Supabase: `npm run supabase-stop`

## XRPL Course: Run

1. Serve application: `npx nx serve xrpl-course-react`
2. Navigate to [localhost:4202](http://localhost:4202/)

## Nx Shadcn Installation

1. Generate shadcn library: `npx nx generate @nx/react:library --directory=libs/shadcn --bundler=vite --name=shadcn --compiler=swc --no-interactive`
2. Delete src folder: `rm -rf libs/shadcn/src`
3. Make `ui` & `styles` directories: `mkdir libs/shadcn/ui & mkdir libs/shadcn/styles`
4. Make `global.css` file: `touch libs/shadcn/styles/global.css`
5. Change `shadcn` path in `tsconfig.base.json` to this: `"@shadcn/ui": ["libs/shadcn/src/ui"]`
6. Install `tailwind` libraries: `npm i tailwindcss-animate class-variance-authority clsx tailwind-merge @radix-ui/react-icons`
7. Add tailwind to `shadcn` library & your application: `npx nx g @nx/react:setup-tailwind`
8. Add [styles](https://ui.shadcn.com/docs/installation/manual#configure-styles) from `shadcn` docs to global.css.
9. Add ref to shadcn tailwind inside your app.

```
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const TailwindConfig = require('../../libs/shadcn/tailwind.config'); // 1: ADD THIS
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...TailwindConfig, // 2: ADD THIS
 content: [
    ...TailwindConfig.content, // 3: ADD THIS
   join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
   ...createGlobPatternsForDependencies(__dirname),
 ],
  theme: { // 4: REMOVE THIS
    extend: {},
  },
  plugins: [], // 5: REMOVE THIS
```

10. Add another path to `tsconfig.base.json`: `"@shadcn/styles/*": ["libs/shadcn/src/styles/*"],`
11. Import `global.css` into app `styles.css`: `import '@shadcn/styles/global.css';`
