# Contributing

If you want to create a hook named `use-test`.

## Git Clone

```sh
git clone https://github.com/ahooksjs/useTable.git
```

## Checkout

```sh
git checkout -b feat/use-test
```

## Add Hook

```sh
npm run add:pkg use-test
```

The directory is 

```sh
├── __tests__
│   └── index.test.tsx
├── demo
│   └── default.tsx # Demo
├── index.zh-CN.md # Document
├── package.json
├── src
│   ├── index.ts 
│   └── type.ts # Interface
└── tsconfig.build.json

## Dev

```sh
npm run dev
```

## Test

- Run All Test

```sh
npm run test
```

- Run Single Test

```sh
npm run test -t <name-of-spec>
```