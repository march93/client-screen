import express, { Application } from 'express';
import cors from 'cors';
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
    this.server.use(cors());
  }

  private routes() {
    this.server.use(routes);
  }
}

export default App;
