# create-node-project

An opinionated scaffolding generator for Node.js projects.

## Usage

Just clone the repository and then launch:

`npm install`

You can then run the tool by simply executing:

`npm start`

If you want to use the tool from any directory, you can install the project globally with the following command:

`npm install -g .`

After that, you can invoke the tool from any directory by just typing:

`create-node-project`

## Default values

The tool will ask you a couple of information, such as the name of the project, a description, the name of the author, the license, etc.

Some of these information are probably always the same, for each new project you create (for example the author's name and email). To prevent inserting these values again and again, you can create some default values for these fields.

To set the default values, create a file called `.defaults.json` in the root folder of the project. This file should contain all the default values in a JSON structure like this:

```
{
  "license": "MIT",
  "author": "Tiziano Pessa <tiziano.pessa@gmail.com>"
}
```

The default values can of course be overwritten, but provide a convenient way of filling some repetitive fields.

## Tool configuration

This tool creates a basic structure for a Node.js project. To do this, it needs some information that can be found in the tool configuration folder `conf`.

The file inside this folder are loaded and merged in the following order:

```
conf/base.json
conf/<language>.json
conf/<projectType>.json
```

So for example a TypeScript CLI project will try to load the following files:

```
conf/base.json
conf/typescript.json
conf/cli.json
```

Please note that not necessarily all these file exist in the `conf` directory: of course if a file doesn't exist, it cannot be loaded, so it's just skipped.

The configurations specified inside these files are basically used to compile the `package.json` file so you can find the following keys and the corresponding values:

```
scripts
dependencies
devDependencies
```

Please note that for `dependencies` and `devDependencies` you have to specify just the package name, since the tool will always include in the project the latest version of the dependency.

In the configuration files there could also be present a section named `variables`, containing some key-value pairs. The purpose of this section is to provide some generic configuration that can be used when building the project. Moreover, the variables can also be used among the values of the other keys of the configuration files.

For example:

```
{
  "variables": {
    "nodeVersion": "18"
  },
  "devDependencies": [
    "@tsconfig/node${nodeVersion}"
  ]
}
```

**Please note that at least the `nodeVersion` variable must be specified for TypeScript projects.**

## Samples

When the tool creates a new project, it also include a main file and at least a test file, so that you already have the basic structure of your project.

The samples included in the project can be found in the `samples` directory, which has a structure like this:

`samples/<projectType>/<language>`

Under this tree the tool will look for a `src` folder and a `tests` folder. Anything found inside these directories will be copied to the new project.

## CommonJs (CJS) vs EcmaScript Modules (ESM)

Please keep in mind that, for the sake of simplicity, the module system is chosen based on the required project configuration, that is:

- if the project main language is **JavaScript**, the default module type is **CommonJs**
- if the project main language is **TypeScript**, the default module type is **EcmaScript Modules**
