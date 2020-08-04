# 协作指南

这一篇是让你能新增一个 Hook 的工作流而写的，假设你要创建的 Hook 名称是 `use-test`。

## Git Clone

先拉取代码

```sh
git clone https://github.com/ahooksjs/useTable.git
```

## Checkout

新建一个分支，以 `feat/` 开头

```sh
git checkout -b feat/use-test
```

## Add Hook

创建 Hook 本地目录，有对应的目录规范

```sh
npm run add:pkg use-test
```

生成之后目录结构是

```sh
├── __tests__
│   └── index.test.tsx
├── demo
│   └── default.tsx # Demo
├── index.zh-CN.md # 文档，可以引用 demo
├── package.json
├── src
│   ├── index.ts # 代码
│   └── type.ts # 接口定义
└── tsconfig.build.json

## Dev

本地开发

```sh
npm run dev
```

## Test

- 执行所有 Test

```sh
npm run test
```

- 执行单个 Test

```sh
npm run test -t <name-of-spec>
```