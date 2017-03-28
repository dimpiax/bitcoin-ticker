# Bitcoin ticker

Sample Node.js project of currency rates relatively to bitcoin.
Project implemented on JavaScript, using the latest ES features and React, dated on the latest commit.

Its development environment based on: Babel, Flow, ESLint.

## Running
After project cloning and installing dependencies, you have to run server by:
`npm start`.

You can start server manually using next arguments:
* delay – delay before first request
* interval – interval request after fetching currencies data completion
* curr – currencies separated by comma, where first element as a base

#### Example
```bash
node server.js --interval 2000 --delay 1000 --curr GBP,EUR
```

## Using
Application outputs in several modes:
* owner – through console:

<img src=example_assets/console-output.png width=50% height=50% />

* client – application runs http server on 3000 port, so it provides two cases:
  1. `http://localhost:3000/watch` – returns a stream
  2. `http://localhost:3000/watch/render` – returns a SSR page based on React
