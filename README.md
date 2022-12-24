# Image Processing API
#### First Project in Web Advanced Track Udacity
###### Developed by Mariam Mohamed Ibrahim 

This is a simple dynamic website which has the following specs.

- View image on the device through file system
- Resize the image according to queries

## ✨ Technologies
### Front-End

- HTML 
- CSS 
- TypeScript

### Back-End

- Express.js 

### Testig

- Jasmine


## ✨ Installation & Starting 

Requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies.

```sh
cd Image-Processing-API
npm i
```

Start the server for development

```sh
npm run dev
```
Start the server for formating

```sh
npm run prettier
npm run lint
```

## ✨ Description 

There is a search bar in the main route and some instructions.

Please read instruction and follow the examples.

## ✨ Available Endpoints 

- Main route with simple UI at the endpoint `Get /`.

- Image route can be accessed through the endpoint `GET /image`.

Get specific image from the available images `GET /image?filename={IMAGE_NAME}`.

Create thumb version of image.

`GET /image?filename={IMAGE_NAME}&width={WIDTH}&height={HEIGHT}`.


## ✨ Testing 

Shutdown the server and type the following command.

type `ctrl + c` to shutdown the server.

```sh
npm run test
```

