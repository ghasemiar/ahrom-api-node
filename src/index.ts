import * as express from 'express';
import 'reflect-metadata';
import 'es6-shim';
import { myDataSource } from './database/typeorm.connection';
import * as cors from 'cors';
import userRoutes from './modules/user/user.routes';
import categoryRoutes from './modules/category/category.route';
import postRoutes from './modules/blog/post.route';
import tagRoutes from './modules/tag/tag.routes';
import imageRoutes from './modules/./image/image.routes';
import config from './config';

//express config
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/images', express.static('images'));
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);
app.use('/api', imageRoutes);

//define port
const PORT = config.APP_PORT;

//initial database
myDataSource
  .initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error during Data Source initialization:', err);
  });
