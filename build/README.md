# Build Lifecycles

Place build lifecycle files in this directory. Each file is named

```
lifecycle.{target}.json
```

Where ```{target}``` can be passed to ```grunt``` using the ```--target``` flag, e.g.:

```sh
grunt --target=release
```

Passing a lifecycle name will also run all preceding phases, e.g.:

```sh
grunt --target=release compile
```

To run an individual phase *only*, prefix the name with ```phase-```, e.g.:

```sh
grunt --target=release phase-compile
```

This is how tasks are called from the maven build.
