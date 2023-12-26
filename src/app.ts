import express, { Application } from 'express';
import routes from './routes';

class App {
  public server: Application;

  constructor() {
    // Initialize express server
    this.server = express();

    // Initialize middleware and routes
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(express.json());
  }

  private routes() {
    this.server.use(routes);
  }
}

export default new App().server;
