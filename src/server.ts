import { PORT } from './config';

import App from './app';

const port = PORT || 3000;

const app = new App();
app.server.listen(port);
