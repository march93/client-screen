import { Router } from 'express';
import ofacSearch from './ofac-service';
import { AxiosError } from 'axios';
import { Request } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const routes = Router();

interface SearchParams {
  name: string;
  birthyear: number;
  country: string;
}

routes.post('/search', async (req, res) => {
  try {
    // Validate inputs
    if (isInvalid(req)) {
      return res.status(400).json({ error: 'All fields must be filled' });
    }

    const { name, dob, citizenship } = transform(req.body);

    return res.json(await ofacSearch(name, dob, citizenship));
  } catch (e) {
    // Capture error and send to client
    const error = e as AxiosError;
    res
      .status(error.response?.status as number)
      .json({ error: error.response?.data });
  }
});

const isInvalid = (
  req: Request<{}, any, any, ParsedQs, Record<string, any>>
) => {
  const { name, birthyear, country } = req.body;

  if (name === undefined || birthyear === undefined || country === undefined) {
    return true;
  }

  return false;
};

const transform = ({ name, birthyear, country }: SearchParams) => {
  // Destructure and format birthdate to YYYY-MM-DD
  // Set to local time to fetch proper date
  const date = new Date(birthyear + 'T00:00');
  const dob = `${date.getFullYear()}-${getTwoDigits(
    date.getMonth() + 1
  )}-${getTwoDigits(date.getDate())}`;

  // Eliminate whitespace from name and form proper name
  // Set the name to lowercase
  const nameArray = name.split(/[ ,]+/).map((f) => f.toLowerCase());
  const fullName = nameArray.join(' ');

  // Perform the same transformation to country
  const countryArray = country.split(/[ ,]+/).map((f) => f.toLowerCase());
  const validCountry = countryArray.join(' ');

  return { name: fullName, dob, citizenship: validCountry };
};

// The OFAC API requires months and days to be in double digits
// September must be written 09 and not 9
// Once we parse the dates, we need to add a leading 0
const getTwoDigits = (date: number) => {
  if (date < 10) {
    return '0' + date;
  }

  return date;
};

export default routes;
