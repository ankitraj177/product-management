import axios from "axios";
import dotenv from "dotenv";
dotenv.config()
const { SWAGGER_URL , POSTMAN_API_KEY, POSTMAN_COLLECTION_ID } = process.env
 console.log(SWAGGER_URL , POSTMAN_API_KEY, POSTMAN_COLLECTION_ID)
// Replace with your actual values
const COLLECTION_NAME =  process.env.COLLECTION_NAME ?  process.env.COLLECTION_NAME : "NEW COLLECTION"; // Your custom collection name
const updatePostmanCollection = async (collectionName) => {
  try {
    // Fetch Swagger JSON
    const swaggerResponse = await axios.get(SWAGGER_URL);
    const swaggerJson = swaggerResponse.data;
    if (!swaggerJson.paths) {
      throw new Error("Invalid Swagger JSON: 'paths' property is missing.");
    }
    // Prepare Postman collection
    const postmanCollection = {
      info: {
        name: collectionName,
        schema:
          "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
      },
      item: [],
    };
    const tagGroups = {};
    // Group endpoints by tags
    Object.keys(swaggerJson.paths).forEach((path) => {
      const pathItem = swaggerJson.paths[path];
      Object.keys(pathItem).forEach((method) => {
        const request = pathItem[method];
        const tags = request.tags || [];
        tags.forEach((tag) => {
          if (!tagGroups[tag]) {
            tagGroups[tag] = {
              name: tag,
              item: [],
            };
          }
          tagGroups[tag].item.push({
            name: request.summary || `${method.toUpperCase()} ${path}`, // Use summary here
            request: {
              method: method.toUpperCase(),
              header: [
                {
                  key: "Content-Type",
                  value: "application/json",
                },
              ],
              url: {
                raw: `{{baseUrl}}${path}`,
                host: ["{{baseUrl}}"],
                path: path.split("/").filter(Boolean),
              },
              body: request.requestBody
                ? {
                    mode: "raw",
                    raw: JSON.stringify(
                      request?.requestBody?.content["application/json"]
                        ?.example,
                      null,
                      2
                    ),
                    options: {
                      raw: {
                        language: "json",
                      },
                    },
                  }
                : undefined,
            },
          });
        });
      });
    });
    // Add tags as folders to Postman collection
    Object.values(tagGroups).forEach((tagGroup) => {
      postmanCollection.item.push({
        name: tagGroup.name,
        item: tagGroup.item,
      });
    });
    // Update Postman collection using Postman API
    await axios.put(
      `https://api.getpostman.com/collections/${POSTMAN_COLLECTION_ID}`,
      { collection: postmanCollection },
      { headers: { "X-Api-Key": POSTMAN_API_KEY } }
    );
    console.log("Postman collection updated successfully!");
  } catch (error) {
    console.error("Error updating Postman collection:", error);
  }
};
const collectionName = process.argv[2] || COLLECTION_NAME;
// console.log(collectionName);
updatePostmanCollection(collectionName);