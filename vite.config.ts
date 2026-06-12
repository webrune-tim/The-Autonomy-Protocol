import { defineConfig } from "vite-plus";

const isVercel = !!process.env.VERCEL;

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  ...(isVercel
    ? {}
    : {
        lint: {
          options: { typeAware: true, typeCheck: true },
        },
      }),
  run: {
    cache: true,
  },
});
