export const tsConfigServerTemplate = (): string => {
  return `{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["./server/*"]
}`;
};
