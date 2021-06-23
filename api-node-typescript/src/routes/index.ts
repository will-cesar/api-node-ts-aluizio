import { Router } from 'express';
import itemsRouter from './items.routes';
import locationsRouter from './locations.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/items', itemsRouter);
routes.use('/locations', locationsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;