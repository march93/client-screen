import express, { Application } from 'express';

class App {
  public server: Application;

  constructor() {
    // Initialize express server
    this.server = express();

    // Initialize middleware
    this.middlewares();
  }

  private middlewares() {
    this.server.use(express.json());
  }
}

export default new App().server;
