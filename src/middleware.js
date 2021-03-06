import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

export const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: 'ap-northeast-2',
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    bucket: 'wetube-v2/video',
    acl: 'public-read',
  }),
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    bucket: 'wetube-v2/avatar',
    acl: 'public-read',
  }),
});

export const uploadVideo = multerVideo.single('videoFile');
export const uploadAvatar = multerAvatar.single('avatar');

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
