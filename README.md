# Strawbees Code UI

Web based interface for Strabess CODE built with [Next](https://nextjs.org/).

## Building

Next will generate a static website so you must provide some building context in form of configuration files and environment variables.

### Configuring the build

The current build uses the `next.config.js` file to list all the parameters for the build.

It also uses the environment variable `CONFIG` to select the appropriated configuration. The available configuration options are listed in `lib/scripts/buildTargets.js`:

- `web_stage`: Builds for CODE Website using stage/develop configuration.
- `web_production`: Builds for CODE Website using production configuration.
- `desktop_stage`: Builds for CODE Desktop App using stage configuration.
- `desktop_production`: Builds for CODE Desktop App using production configuration.

### Running the build script

There are 2 build scripts:

- `lib/scripts/build.js`: Will generate the static files for the environment set by `CONFIG` and will output the result to `./out` folder.
- `lib/scripts/buildTargets.js`: Will generate static files for all the available environment and will output it on folders named by the environment (for example `web_stage`) inside the `./out` folder.

You can run them manually:

```shell
# To build `web_stage`
CONFIG=web_stage node lib/scripts/build.js
# To build all targets
node lib/scripts/buildTargets.js
```

Or run using npm scripts:

```shell
# To build `web_stage`
CONFIG=web_stage npm run build
# To build all targets
npm run build-targets
```


## Running locally

"Running the UI" is a questionable practice as the UI it's not a stand alone project but a dependency that can be fit inside other applications such as an desktop app, a website or a mobile app to provide an standard interface for Strawbees CODE.

Therefore the recommended way to run this project is to include it on the project you want to use it and run the project, not the UI.

For development, the general recommendation is to use `npm link`:

- Run `npm link` on this repository
- Run `npm link @strawbees/code-ui` on the application project


### Website

Because the build will generate a static website, a shortcut to run the UI locally would be to build the application and run a static website server (such as [`http-server`](https://www.npmjs.com/package/http-server)) on the "output folder" (`./out` or in one of the "target" build folders).

```
npm install -g http-server
CONFIG=web_stage npm run build
http-server -c-1 -p 8080 ./out
```

Or

```
npm install -g http-server
npm run build-targets
http-server -c-1 -p 8080 ./out/web_stage
```


### Desktop App

If you are developing for the Desktop App, because there are mulitple builds and levels of configuration, the most straight forward way to develop is to manually create a symbolic link from the "output folder" to the folder Desktop App is expecting the UI to be (usually the `src/ui`).

Assuming you have two folders side by side `code-ui` and `code-desktop` and is developing on a UNIX based OS:

```
# Build UI
cd code-ui
CONFIG=desktop_stage npm run build
cd ..

# Link UI to app
ln -s $(pwd)/code-ui/out $(pwd)/code-destkop/src/ui

# Run the app
cd code-desktop
npm start
```

## Translations

TODO
