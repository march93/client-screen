import App from './app';

const port = process.env.PORT || 3000;

const app = new App();
app.server.listen(port);
