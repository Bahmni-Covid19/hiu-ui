import axios from 'axios';
import { defaultHeaders } from '../constants';
import Config from "../Config";

export default (
  method,
  url,
  data,
  headers = defaultHeaders,
  baseURL = Config.ENV_BACKEND_BASE_URL + Config.ENV_BACKEND_API_PATH,
) => axios({
  headers,
  method,
  data,
  url,
  baseURL,
});
