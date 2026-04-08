This is a note to help with the development state of Termite.

## pnpm

Pnpm is the package manager in this project. It essentially creates sym links between packages
so you don't have to double install things.

pnpm scripts map to turbo scripts, as defined in /package.json.

## Turbo 

Turbo is the task runner that schedules the building of these packages.
It makes it so that things that depend on other things will have those things
built first. In this case, core will be built before react.
This is shown in /packages/react/package.json file, where it names termite-core
as a dependency.

## Tsup
Tsup is what is actually building the package. It essentially does tsc and esbuild in one.
