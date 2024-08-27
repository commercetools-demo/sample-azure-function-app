# Azure Functions with Commercetools Integration

This project contains Azure Functions that interact with the Commercetools API to retrieve product information. It provides two main endpoints:

1. `getProductByID`: Retrieves a product by its ID
2. `getProductBySKU`: Retrieves a product by its SKU

## Prerequisites

- Node.js (v14 or later)
- Azure Functions Core Tools (v4)
- Yarn or npm
- A Commercetools account with API credentials

## Setup

1. Clone this repository:
   ```
   git clone https://github.com/commercetools-demo/sample-azure-function-app
   cd sample-azure-function-app
   ```

2. Install dependencies:
   ```
   yarn install
   ```
   or
   ```
   npm install
   ```

3. Create a `.env` file in the project root with the following content:
   ```
   "CTP_PROJECT_KEY": "your-project-key",
   "CTP_CLIENT_ID": "your-client-id",
   "CTP_CLIENT_SECRET": "your-client-secret",
   "CTP_API_URL": "api url",
   "CTP_AUTH_URL": "auth url"
   ```
   Replace the Commercetools credentials with your own.
4. create a `local.settings.json` file in the project root with the following content:
   ```json
   {
     "IsEncrypted": false,
     "Values": {
       "AzureWebJobsStorage": "<connection-string-to-storage>",
       "FUNCTIONS_WORKER_RUNTIME": "node"
     }
   }
   ```
   Replace the `AzureWebJobsStorage` with the connection-string that you get using [this manual](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code?tabs=node-v4%2Cpython-v2%2Cisolated-process%2Cquick-create&pivots=programming-language-javascript#configure-the-project-to-run-locally)

## Running Locally

To run the functions locally, use the Azure Functions Core Tools:

```
func start
```

This will start the functions and provide local URLs for testing.

## Endpoints

### Get Product by ID

- **URL**: `/api/getProductByID`
- **Method**: `GET`
- **Query Params**: `id=[string]`
- **Success Response**: 
  - **Code**: 200
  - **Content**: `{ "name": "Product Name", "description": "Product Description" }`

### Get Product by SKU

- **URL**: `/api/getProductBySKU`
- **Method**: `GET`
- **Query Params**: `sku=[string]`
- **Success Response**: 
  - **Code**: 200
  - **Content**: `{ "name": "Product Name", "description": "Product Description" }`

## Deployment

To deploy to Azure Functions:

1. Create an Azure Function App in your Azure portal.
2. Set up your deployment method (e.g., GitHub Actions, Azure DevOps, or manual deployment).
3. Make sure to configure the application settings in your Azure Function App with the same environment variables as in your `local.settings.json`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
