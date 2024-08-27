const { app } = require("@azure/functions");
const { createApiRoot } = require("../utils/commercetools");
const { handleResponse } = require("../utils/handle-response");

app.http("getProductBySKU", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const sku = request.query.get("sku");
    if (!sku) {
      return handleResponse({ message: "Please provide a product SKU" }, 400);
    }
    try {
      const response = await createApiRoot()
        .products()
        .get({
          queryArgs: {
            where: `masterData(current(masterVariant(sku="${sku}")))`,
          },
        })
        .execute().catch((error) => {
            context.log(error)
        });

      if (response.body.results.length === 0) {
        return handleResponse({ message: "Product not found" }, 400);
      }

      const product = response.body.results[0];

      const name = product?.masterData?.current?.name?.["en-US"];
      const description = product?.masterData?.current?.description?.["en-US"];
      const productSku = product?.masterData?.current?.masterVariant?.sku;
      const id = product?.id;

      return handleResponse({ id, name, description, sku: productSku });
    } catch (error) {
      return handleResponse({ message: "Error fetching product" }, 500);
    }
  },
});
