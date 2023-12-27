import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT as string;
const OFAC_URL = process.env.OFAC_URL as string;
const API_KEY = process.env.API_KEY as string;

export { PORT, OFAC_URL, API_KEY };
