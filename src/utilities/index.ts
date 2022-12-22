import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
//get image directory
export const getImageDir = (dir: string = __dirname): string => {
  const dirContent = fs.readdirSync(dir)
  if (dirContent.includes('images')) {
    return path.join(dir, 'images')
  } else {
    return getImageDir(path.join(dir, '..'))
  }
}
//get image path
export const getImagePath = async (
  filename: string,
  height: number,
  width: number
): Promise<string> => {
  const imageDir = getImageDir()
  const originalImage = path.join(imageDir, filename + '.jpg')
  const resizedDir = path.join(imageDir, 'resized')
  //when no mension width or height return original image
  if (!width && !height) {
    return originalImage
  } 
  // when width or height or both is mensioned 
  else {
    const inPath = path.join(imageDir, filename + '.jpg')
    // if resized folder not exit (make it)
    if (!fs.existsSync(resizedDir)) {
      fs.mkdirSync(resizedDir)
    }
    if (width && height) {
      const outPath = path.join(
        imageDir,
        'resized',
        `${filename}-width${width}-height${height}.jpg`
      )
      //if the image already found in resized folder return it 
      if (fs.existsSync(outPath)) {
        return outPath
      } 
      //if the image not existed in the resizsed folder
      else {
        const image = sharp(inPath)
        await image
          .resize({
            width,
            height
          })
          .toFile(outPath)
        return outPath
      }
    } else if (width) {
      const outPath = path.join(imageDir, 'resized', `${filename}-width${width}.jpg`)
      if (fs.existsSync(outPath)) {
        return outPath
      } else {
        const image = sharp(inPath)
        await image
          .resize({
            width
          })
          .toFile(outPath)
        return outPath
      }
    } else {
      const outPath = path.join(imageDir, 'resized', `${filename}-height${height}.jpg`)
      if (fs.existsSync(outPath)) {
        return outPath
      } else {
        const image = sharp(inPath)
        await image
          .resize({
            height
          })
          .toFile(outPath)
        return outPath
      }
    }
  }
}
