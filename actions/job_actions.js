import axios from 'axios';
import qs from 'qs';

import {
  FETCH_JOBS,
  LIKE_JOB
} from './types';

const JOB_ROOT_URL = 'https://jobs.github.com/positions.json?'
const JOB_QUERY_PARAMS = {
  description: 'javascript',
  markdown: true
};

const buildJobsUrl = (latitude, longitude) => {
  const query = qs.stringify({...JOB_QUERY_PARAMS, lat: latitude, long: longitude });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = ({ latitude, longitude}, callback) => async dispatch => {
  try {
    const url = buildJobsUrl(latitude, longitude);
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
  } catch (err) {
    console.error(err);
  }
};

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};
