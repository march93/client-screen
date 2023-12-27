import { OFAC_URL, API_KEY } from './config';

import axios from 'axios';

const requestBody = (name: string, dob: string, citizenship: string) => {
  return {
    apiKey: API_KEY,
    source: ['SDN', 'NONSDN', 'DPL', 'UN', 'UK', 'EU', 'DFAT'],
    type: ['Individual'],
    cases: [
      {
        name,
        dob,
        citizenship,
      },
    ],
  };
};

const ofacSearch = async (name: string, dob: string, citizenship: string) => {
  try {
    const result = await axios.post(
      OFAC_URL,
      requestBody(name, dob, citizenship)
    );

    // Look for matches within the returned cases
    return analyze(name, dob, citizenship, result.data.matches);
  } catch (e) {
    // Add logging
    throw e;
  }
};

const analyze = (
  name: string,
  dob: string,
  citizenship: string,
  matches: any
) => {
  // Indicator for matches
  const result = { name: false, dob: false, citizenship: false };

  // Fetch the matched data based on the name
  const data: any = Object.entries(matches)[0];

  // If matched cases size === 0, return result as is
  if (data[1].length === 0) {
    return result;
  }

  data[1].forEach((f: any) => {
    console.log(f);
    // Set name flag to true if we find a case with a matching name
    if (!result.name && f.fullName.toLowerCase() === name) {
      result.name = true;
    }

    // Convert given dob and matches dob to date and compare
    const givenDOB = new Date(dob);
    const matchesDOB = new Date(f.dob);
    if (!result.dob && dateComparison(givenDOB, matchesDOB)) {
      result.dob = true;
    }

    // Convert citizenship to lowercase and compare
    const country = citizenship.toLowerCase();
    if (
      !result.citizenship &&
      f.citizenship.some((k: string) => k.toLowerCase() === country)
    ) {
      result.citizenship = true;
    }
  });

  return result;
};

const dateComparison = (givenDOB: Date, matchesDOB: Date) => {
  // If the year matches, return true
  return givenDOB.getFullYear() === matchesDOB.getFullYear();
};

export default ofacSearch;
