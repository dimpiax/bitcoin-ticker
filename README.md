# Bitcoin ticker

Sample Node.js project of currency relations regarding to bitcoin.
Project implemented on JavaScript, using the latest ES features and React, dated on the latest commit.

It has development environment based on: Babel.js, Flow, ESLint.

## Running
After project clonning and installing dependencies, you have to run server by:
`npm start`.

You can start server manually using next arguments:
* delay – delay of begin first requesting
* interval – interval request after complete fetching currencies data
* curr – currencies separated by comma, regarding to first element as base

#### Example
```bash
node server.js --interval 2000 --delay 1000 --curr GBP,EUR
```

## Using
Application outputs in several modes:
* owner – through console:

<img src=example_assets/console-output.png width=50% height=50% />

* client – application runs http server on 3000 port, so it provides two cases:
  1. `http://localhost:3000/watch` – watching as stream
  2. `http://localhost:3000/watch/render` – watching ssr page based on React
