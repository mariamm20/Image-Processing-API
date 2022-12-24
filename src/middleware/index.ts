import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { getImageDir } from '../utilities/index';

const imageDir = getImageDir();

//validate the existance of images file

export const fileExits = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const filename = req.query.filename;

  if (filename) {
    if (fs.existsSync(path.join(imageDir, filename + '.jpg'))) {
      next();
    } else {
      res.status(404).send('file not found');
    }
  } else {
    res.status(400).send('filename query is required');
  }
};

//validate dimenions

export const validateDimensions = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { height, width } = req.query;
  const heightNumber = parseInt(height as string);
  const widthNumber = parseInt(width as string);
  let sendnext = true;
  if (widthNumber <= 0 || (width && !widthNumber)) {
    res.status(400).send('width must be a number greater than 0');
    sendnext = false;
  }
  if (heightNumber < 0 || (height && !heightNumber)) {
    res.status(400).send('height must be greater than 0');
    sendnext = false;
  }
  if (sendnext) {
    next();
  }
};
