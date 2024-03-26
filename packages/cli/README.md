# shadcn-solid

A CLI for adding components to your project, port of [shadcn-ui](https://github.com/shadcn/ui/tree/main/packages/cli).

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, configures `tailwind.config.cjs`, and CSS variables for the project.

```bash
npx shadcn-solid init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx shadcn-solid add [component]
```

### Example

```bash
npx shadcn-solid add alert-dialog
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx shadcn-solid add
```

## Documentation

Visit https://shadcn-solid.com/docs to view the documentation.

## License

Licensed under the [MIT license](https://github.com/hngngn/shadcn-solid/blob/main/LICENSE.md).
