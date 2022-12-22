import express, { Application, Request, Response } from 'express'
import { fileExits, validateDimensions } from './middleware/index'
import { getImagePath } from './utilities'
const PORT = 3000
const app: Application = express()

//main route
app.get('/', (req: Request, res: Response) => {
  res.render("home.ejs");
})

// middleward
app.use(fileExits, validateDimensions)

//image route
app.get('/image', async (req: Request, res: Response): Promise<void> => {
  //get queries from the url
  const { filename, width, height } = req.query
  res.sendFile(
    await getImagePath(filename as string, parseInt(height as string), parseInt(width as string))
  )
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
