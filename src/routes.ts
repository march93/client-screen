import { Router } from 'express';

const routes = Router();

routes.get('/', (_, res) => {
  return res.json({ message: 'Client Screen App' });
});

export default routes;
