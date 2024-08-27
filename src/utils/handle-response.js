const handleResponse = (response, status) => {
  return {
    status: status ? status : 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};

module.exports = {
  handleResponse,
};
