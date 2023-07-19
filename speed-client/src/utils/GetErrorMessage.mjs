const GetErrorMessage = (error) => {
  return error.response ? error.response.data : error.message;
};

export default GetErrorMessage;
