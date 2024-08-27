const { createClient } = require("@commercetools/sdk-client");
const {
  createAuthMiddlewareForClientCredentialsFlow,
} = require("@commercetools/sdk-middleware-auth");
const { createHttpMiddleware } = require("@commercetools/sdk-middleware-http");
const {
  createApiBuilderFromCtpClient,
} = require("@commercetools/platform-sdk");

const dotenv = require("dotenv");
dotenv.config();

// Commercetools client configuration
const projectKey = process.env.CTP_PROJECT_KEY;
const clientId = process.env.CTP_CLIENT_ID;
const clientSecret = process.env.CTP_CLIENT_SECRET;
const apiUrl = process.env.CTP_API_URL;
const authUrl = process.env.CTP_AUTH_URL;

const createProjectClient = () =>
  createClient({
    middlewares: [
      createAuthMiddlewareForClientCredentialsFlow({
        host: authUrl,
        projectKey,
        credentials: {
          clientId,
          clientSecret,
        },
        fetch,
      }),
      createHttpMiddleware({
        host: apiUrl,
        fetch,
      }),
    ],
  });

const createApiRoot = ((root) => () => {
  if (root) {
    return root;
  }

  root = createApiBuilderFromCtpClient(createProjectClient()).withProjectKey({
    projectKey: projectKey,
  });

  return root;
})();

module.exports = {
  createApiRoot,
};
