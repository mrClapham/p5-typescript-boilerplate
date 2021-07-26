# A Typescript boilerplate for creating p5 sketches

## Testing:

**Jest.**

run

```
yarn test
```

or

```
yarn test:watch
```

## Building:

**Parcel.**

```
yarn dev
```

The outputs compiled files in `dist`

The demo project may be viewed at [http://localhost:1234/](http://localhost:1234/)

```
yarn umd
```

This builds the library in UMD (Universal Model Definitions) format, suitable for publishing to NPM.
Compiled code is exported to `build`

## Semantic versioning:

**Commitizen.**

run

```
yarn commit
```

And follow the command-line instructions.

This ensures commits and version number are correct for publishing to NPM.
