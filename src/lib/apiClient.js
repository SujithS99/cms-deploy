const { API_BASE_URL } = require("../config/settings");

//handling api calls
const apiClient = async (requestPath, method, body = null, query = undefined, accessToken = undefined) => {

  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
 
  console.log("API call", requestPath);
 
  return await fetch(
    `${API_BASE_URL}${requestPath}?${new URLSearchParams(query).toString()}`,
    {
      method: method,
      body: body ? new URLSearchParams(body).toString() : undefined,
    }
  ).then((response) => response.json());
};

export default apiClient;