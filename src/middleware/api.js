import axios from "axios";
import * as actions from "./actions";
import { baseUrl } from "./url.js";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const {
      url,
      method,
      data,
      onStart,
      onSuccess,
      onFailed,
    } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);

    try {

      let headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.request({
        baseURL: baseUrl,
        url,
        method,
        data,
        headers,
      });

      // For Specific

      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // For Specific
      if (onFailed) dispatch({ type: onFailed, payload: error.message });
    }
  };

export default api;
