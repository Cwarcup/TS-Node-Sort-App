# TS-Node-Sort-App
 Second  design patterns application from Typescript: The Complete Developer's Guide

1. create **tsconfig** file
`tsc --init`
2. create 'index.ts' file, add `console.log('hi there'); ` for testing purposes.
   1. can do basic compile, turning ts file into js code, therefore can run in browser. But new js file is created every time we compile. This is not good.
    `tsc index.ts`
4. Better option
   1. create folder **'src'** and place **'index.ts'** in here.
   2. create another new folder called **'build'**. Should NOT be inside 'src'.We will use this to store our compiled JS files.
   3. inside the `tsconfig` file, change these settings:
```json
{
  // ...
  "outDir": "./build",
  "rootDir": "./src", 
  // ...
}
```
5. Can now run `tsc` to compile the TS. Better option is to use:
```
tsc -w
```
> -w flag is used to "watch" the files in side the files in the rootDir (src for us). This means we will not constantly need to run `tsc`. It allows us to **continuously compile code**. 

