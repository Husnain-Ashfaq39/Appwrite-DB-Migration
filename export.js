const sdk = require('node-appwrite');
const fs = require('fs');

const client = new sdk.Client()
  .setEndpoint("https://centralapps.hivefinty.com/v1") // Your API Endpoint
  .setProject("66fbcc72001251d28def") // Your project ID
  .setKey("standard_ac48b50124e40dec7d813fa777d545f88e804b65bc5523aac661b49b7d4c648b57e58d2902df6ff260bf8da465f8ff584e17aaeec92d74599861cfdd9584486f75b62be45e2b894daddc9d8e6da37848e0199dabe8f6e9d0ac6c0a131fea8cdc27a80cc2412da4000a68e84f8c02c9679455371ec1a2e72bb810782dd401c155"); // Your secret API key

const databases = new sdk.Databases(client);

// Function to get all attributes of a collection
async function getAttributes(databaseId, collectionId) {
  try {
    const attributes = await databases.listAttributes(databaseId, collectionId);
    return attributes.attributes; // Return only the list of attributes
  } catch (error) {
    console.error(`Error fetching attributes for collection ${collectionId}:`, error);
    return [];
  }
}

// Function to export collection metadata and attributes
async function exportData() {
  try {
    const databaseId = "66fbcd4c00071bf71ae8";
    const collectionsData = {};

    // Get all collections
    const collectionsResponse = await databases.listCollections(databaseId);
    
    // Access collections array directly
    const collections = collectionsResponse.collections || collectionsResponse.documents || [];

    for (const collection of collections) {
      const collectionId = collection.$id;
      
      // Get attributes
      const attributes = await getAttributes(databaseId, collectionId);

      // Structure the data
      collectionsData[collectionId] = {
        collection: {
          $id: collectionId,
          name: collection.name,
          $permissions: collection.$permissions,
          documentSecurity: collection.documentSecurity,
          attributes: attributes,
        }
      };
    }

    // Write data to JSON file
    fs.writeFileSync('exported_metadata.json', JSON.stringify(collectionsData, null, 2), 'utf8');
    console.log('Metadata exported successfully to exported_metadata.json');
  } catch (error) {
    console.error('Error exporting metadata:', error);
  }
}

// Run the export
exportData();
