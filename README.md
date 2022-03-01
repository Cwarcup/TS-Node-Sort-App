# TS-Node-Sort-App
 Second  design patterns application from Typescript: The Complete Developer's Guide

1. create tsconfig file
`tsc --init`
2. create 'index.ts' file, add `console.log('hi there'); ` for testing purposes.
3. can do basic compile, turning ts file into js code, therefore can run in browser. But new js file is created every time we compile. This is not good.
`tsc index.ts`
4. Better option
   1. create folder 'src' and place 'index.ts' in here.
   2. create another new folder called 'build'. Should NOT be inside 'src'.
      1. will use this to store our compiled JS files.
