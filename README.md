# TS-Node-Sort-App
 Second  design patterns application from Typescript: The Complete Developer's Guide

starting file can be found [here:](https://github.com/Cwarcup/notes/blob/1497a91a56c0f6b17e9596908ad4083ed85872ce/root/typescript/Reusable-TS-Snippets/new-TS-project-template)

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
5. Can now run `tsc -w` to compile the TS. Better option is to use:
```
tsc -w
```
> -w flag is used to "watch" the files in side the files in the rootDir (src for us). This means we will not constantly need to run `tsc`. It allows us to **continuously compile code**. 

6. run JavaScript files, but needs to be done manually.
```
node build/index.js
```
7. run file with [Nodemon](https://www.npmjs.com/package/nodemon) and [Concurrently](https://www.npmjs.com/package/concurrently). Open second terminal window in the same directory. We will want `tsc -w` to be running in the previous window.
```
npm init -y

npm install nodemon

npm i concurrently
```

8. in `package.json`, change text under "scripts"
```json
  "scripts": {
    "start:build": "tsc -w",
    "start:run": "nodemon build/index.js",
    "start": "concurrently npm:start:*"
  },
```
> "start": "concurrently npm:start:*" tells concurrently to run anything that starts with "start". 

After Setup:
```
$ tsc -w 
// make sure any saved files produce a new index.js file in build directory.

$ npm start
// starts nodemon.
// nodemon looks in /build to run index.js
```

