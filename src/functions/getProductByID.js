const { app } = require("@azure/functions");
const { createApiRoot } = require("../utils/commercetools");
const { handleResponse } = require("../utils/handle-response");

app.http("getProductByID", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const id = request.query.get("id");
    if (!id) {
      return handleResponse({ message: "Please provide a product ID" }, 400);
    }

    context.log(`Fetching product by ID: ${id}`);

    try {
      const response = await createApiRoot()
        .products()
        .withId({ ID: id })
        .get()
        .execute();

      const name = response.body?.masterData?.current?.name?.["en-US"];
      const description =
        response.body?.masterData?.current?.description?.["en-US"];
      const sku = response.body?.masterData?.current?.masterVariant?.sku;
      const productId = response.body?.id;

      return handleResponse({ name, description, sku, id: productId });
    } catch (error) {
      return handleResponse({ message: "Error fetching product" }, 500);
    }
  },
});
