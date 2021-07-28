// import { validErrorHandler } from './validation';
// import { customErrorHandler } from './custom';
// import { authErrorHandler } from './auth';
// import { daoErrorHandler } from './dao';

// export const errorHandler = (app) => {
//   app.use(validErrorHandler);
//   app.use(customErrorHandler);
//   app.use(authErrorHandler);
//   app.use(daoErrorHandler);

//   app.use((err, req, res, next) => {
//     console.log('## err: ', err);
//     return res.status(500).json(err);
//   });
// };
