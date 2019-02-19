import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
  FETCH_JOBS
} from './types';

const JOB_ROOT_URL = 'https://jobs.github.com/positions.json?'
const JOB_QUERY_PARAMS = {
  description: 'javascript'
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({...JOB_QUERY_PARAMS, location: zip });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region) => async dispatch => {
  try {
    let zip = await reverseGeocode(region);
    const url = buildJobsUrl(zip);
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
