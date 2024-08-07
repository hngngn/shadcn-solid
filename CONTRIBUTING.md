# Contributing

Thanks for your interest in contributing to shadcn-solid.com. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@hnggngnn](https://twitter.com/hnggngnn).

## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io/) and [`workspaces`](https://pnpm.io/workspaces) for development.
- We use [Turborepo](https://turbo.build/repo) as our build system.
- We use [changesets](https://github.com/changesets/changesets) for managing releases.

## Structure

This repository is structured as follows:

```
docs
├── src
    ├── components
    ├── content
packages
└── cli
└── tailwindcss
└── unocss
```

| Path                   | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `docs/src`             | The Astro application for the website.          |
| `docs/src/components`  | The Astro and Solid components for the website. |
| `docs/src/content`     | The content for the website.                    |
| `packages/cli`         | The `shadcn-solid` package.                     |
| `packages/tailwindcss` | The local `tailwindcss ui` package.             |
| `packages/unocss`      | The local `unocss ui` package.                  |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/shadcn-solid.git
```

### Navigate to project directory

```bash
cd shadcn-solid
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
pnpm i
```

### Run a workspace

You can use the `pnpm -F` command to start the development process for a workspace.

#### Examples

1. To run the `shadcn-solid.com` website:

```bash
pnpm dev -F docs
```

2. To run the `shadcn-solid` package:

```bash
pnpm dev -F shadcn-solid
```

## Documentation

The documentation for this project is located in the `www` workspace. You can run the documentation locally by running the following command:

```bash
pnpm dev -F docs
```

Documentation is written using [MDX](https://mdxjs.com). You can find the documentation files in the `docs/src/content/docs` directory.

## Components

We use a package system for developing components. You can find the source code for the components under `packages/tailwindcss/ui` or `packages/unocss/ui`.

```bash
packages
└── tailwindcss
    └── ui
└── unocss
    └── ui
```

When adding or modifying components, please ensure that:

1. You make the changes for both `tailwind` and `uno`.
2. You update the documentation.
3. You run `pnpm build:registry` to update the registry.

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Requests for new components

If you have a request for a new component, please open a discussion on GitHub. We'll be happy to help you out.

## CLI

The `shadcn-solid` package is a CLI for adding components to your project. You can find the documentation for the CLI [here](https://shadcn-solid.com/docs/cli).

Any changes to the CLI should be made in the `packages/cli` directory. If you can, it would be great if you could add tests for your changes.
