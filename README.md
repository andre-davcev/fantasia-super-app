# Fantasia

This is my personal sandbox project which you can find at [andredavcev.com](https://andredavcev.com/). Fantasia comes from one of my favorite movies as a kid [The Neverending Story](<https://en.wikipedia.org/wiki/The_NeverEnding_Story_(film)>). Over the years this project should evolve and become my creative outlet.

## Technology Stack

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx). Every push to the master branch triggers continuous integration using [Github Actions](https://github.com/features/actions). This Angular application is currently on version 14 and utilizes various TypeScript libraries. [RxJS](https://rxjs.dev/) is used extensively throughout the code and am using [NGXS](https://ngxs.gitbook.io/ngxs) for state management.

## Quick Start & Documentation

Although this is a personal project, you should be able to replicate my environment quite easily. Simply clone my repository `git clone https://github.com/andre-davcev/sandbox.git` and then run `npm i` inside the repository folder (assuming you have npm installed globally).

## Running Fantasia locally

Run `npm run fan-serve`. Then navigate to (localhost:4201)[http://localhost:4201/]. Enjoy!

## To Do List

- [ ] Update to Nx `v15`
- [ ] Update to Nx `v16`
- [ ] Update to Nx `v17`
- [ ] Migrate fantasia to be [module federation host](https://nx.dev/recipes/module-federation/create-a-host)
- [ ] Migrate torcoin to be [module federation remote](https://nx.dev/recipes/module-federation/create-a-remote)
- [ ] Add [storybook](https://nx.dev/recipes/storybook/overview-angular) to fantasia
- [ ] `npx nx g @nrwl/workspace:convert-to-nx-project --all`
- [ ] Nx workspace v2
- [ ] Copy over `theory-apps` code format config
- [ ] `npx nx format:write --all`
- [ ] Upgrade [torqoin](https://github.com/andre-davcev/torqoin) to `npx nx migrate 14.8.4`
- [ ] Move business logic to fantasia lib
- [ ] Fix menu missing on child pages
- [ ] Implement [Response Glass Sidebar](https://youtu.be/hAnv1NEE7j8)
- [ ] Replace @angular/flex-layout with tailwind
- [ ] `npx nx migrate latest`
- [ ] Design new icons
- [ ] Implement [WebGL Fluid Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) As Background On `/art`
- [ ] Add soundtrack playlist

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
