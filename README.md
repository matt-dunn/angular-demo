# AngularJS Dynamic Controller Demo

[![Build Status](https://travis-ci.org/matt-dunn/angular-demo.svg)](https://travis-ci.org/matt-dunn/angular-demo)

## Demo

[Demo](http://matt-dunn.github.io/angular-demo/dist/app/)

# Setup and Build Instructions

## Dependencies

* [Node.js](http://nodejs.org/)
* [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
* [Compass](http://compass-style.org/install/)
    * SASS will also be installed
* [grunt-cli](http://gruntjs.com/getting-started)

## Environment setup

```sh
npm install
```

*If you want to run the end-2-end protractor tests, also run:*

```sh
npm run update-webdriver
```

## Build

See also [build lifecycle](build/README.md) and [Grunt](http://gruntjs.com/) for more information.

### Development target

Build the default ```dev``` target:

```sh
grunt
```

is the same as

```sh
grunt install --target=dev
```

or

```sh
grunt clean install
```

to run the clean task prior to executing all the tasks up to and including ```install```.

#### Build output

* app/css/**/*.css
* app-full.min.js

In addition, it will also ensure ```bower.json``` and ```package.json``` files are updated with the version defined in ```pom.xml```.

### Release target

```sh
grunt --target=release
```

#### Build output

* {Gruntfile.js buildOptions.dirs.resourcesTarget}
* reports (e.g. unit test results)

## Maven Integration

Maven can be used to build the project, e.g.:

```sh
mvn install
```

The ```pom.xml``` will call each phase in the lifecycle. See also [build lifecycle](build/README.md) for more information on calling phase tasks.

### Maven Troubleshooting

* If ```node_modules``` or ```bower_components``` are deleted, ```target/nodejs``` must also be removed when performing a ```mvn install``` (or ```mvn clean install```)


### Special Tasks

In addition, individual tasks can be executed. To see a list of available tasks use ```grunt -help```.

#### Run SASS build only

```sh
grunt compass:dev
```

NOTE: Add ```--force``` to the grunt command to force SASS build.

#### Run tests only (unit/e2e)

```sh
grunt run-tests
```

#### Run unit tests only

To run only the unit tests:

```sh
grunt karma:unit
```

#### Run protractor tests only

To run only the end-2-end tests:

```sh
grunt protractor
```

## Running the Webserver

```sh
npm start
```

The application will be served at [http://localhost:8001/app/](http://localhost:8000/app/).


## Other dependencies

* [rpi-library](https://github.com/matt-dunn/rpi-library)

## Application Details

Please see the [documentation](app/README.md) for more information.
