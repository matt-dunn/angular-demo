# AngularJS Dynamic Controller Demo

[![Build Status](https://travis-ci.org/matt-dunn/angular-demo.svg)](https://travis-ci.org/matt-dunn/angular-demo)

## Demo

[Demo](http://matt-dunn.github.io/angular-demo/app/)

## Dependencies

* [Node.js](http://nodejs.org/)

## Install

```sh
npm install
```

*If you want to run the end-2-end protractor tests, first run:*

```sh
npm run update-webdriver
```

## Build

The application is build using ```grunt``` with the following lifecycle:

    * validate
    * compile
    * test
    * package
    * integration-test
    * verify
    * install
    * deploy

See [Maven Introduction to the Build Lifecycle](http://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html).

The ```clean``` task can be ued in conjunction with a phase to perform cleanup (delete reports, minified html/js, etc.).

### Examples

```sh
grunt clean install
```

## Running Individual Tasks

In addition, individual tasks can be executed. To see a list of available tasks use ```grunt -help```.

### Run SASS build only

```sh
grunt build-sass
```

NOTE: Add ```--force``` to the grunt command to force SASS build.

### Run all tests only (unit/e2e)

```sh
grunt run-tests
```

### Examples

To run only the unit tests:

```sh
grunt karma:unit
```

To run only the end-2-end tests:

```sh
grunt protractor
```

## Running the Webserver

```sh
npm start
```

The application will be served at [http://localhost:8000/app/](http://localhost:8000/app/).

## Application Details

Please see the [documentation](https://github.com/matt-dunn/angular-demo/blob/master/app/README.md) for more information.
