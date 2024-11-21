const sdk = require('node-appwrite');
const fs = require('fs');
require('dotenv').config();

const client = new sdk.Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("672e30e10006a55504e6") // Your project ID
  .setKey("standard_f9ba73e0b5a5e9df436c6c807b1c1a28c2cd8e9c921f3b19b712aeb609d101593443129673513db8244e932a10fedbdf66af7e1ffed3d5ea7bd596d169b9a79aeb368e57504ab966b52b7faee0191de3cbca1ec9fb1e9442543e3b0cb776ba0db0914f2d10339adb954f7bee140239707a56eb69b6133e39d1011f3f3d513153"); // Your secret API key

const databases = new sdk.Databases(client);

// Function to create attributes for a collection
async function createAttributes(databaseId, collectionId, attributes) {
  for (const attribute of attributes) {
    switch (attribute.type) {
      case 'string':
        await databases.createStringAttribute(
          databaseId,
          collectionId,
          attribute.key,
          attribute.size || 255,
          attribute.required,
          attribute.default || undefined, // Use undefined if no default is provided
          attribute.array || false, // Optional: pass false if array is not specified
          attribute.encrypt || false // Optional: pass false if encrypt is not specified
        );
        break;
      case 'integer':
        await databases.createIntegerAttribute(databaseId, collectionId, attribute.key, attribute.required);

        break;
      case 'float':
        await databases.createFloatAttribute(databaseId, collectionId, attribute.key, attribute.required);
        break;
      case 'double':
        await databases.createFloatAttribute(databaseId, collectionId, attribute.key, attribute.required);
        break;
      case 'boolean':
        await databases.createBooleanAttribute(databaseId, collectionId, attribute.key, attribute.required);
        break;
      case 'email':
        await databases.createEmailAttribute(databaseId, collectionId, attribute.key, attribute.required);
        break;
      case 'url':
        await databases.createUrlAttribute(databaseId, collectionId, attribute.key, attribute.required);
        break;
      case 'enum':
        await databases.createEnumAttribute(databaseId, collectionId, attribute.key, attribute.elements, attribute.required);
        break;
      case 'ip':
        await databases.createIpAttribute(databaseId, collectionId, attribute.key, attribute.required);
        break;
      case 'datetime':
        await databases.createDatetimeAttribute(databaseId, collectionId, attribute.key, attribute.required);
        break;
      default:
        console.log(`Attribute type ${attribute.type} is not supported.`);
    }
  }
}


// Function to import data from a file
async function importData() {
  try {
    const data = JSON.parse(fs.readFileSync('collections.json', 'utf8'));

    for (const [collectionId, collectionData] of Object.entries(data)) {
      // Recreate collection
      const { collection, documents } = collectionData;
      await databases.createCollection(

        "672e4b2d000b362da616", // Use environment variable for database ID
        collection.$id,
        collection.name,
        collection.$permissions,
        collection.documentSecurity
      );

      // Set attributes for the collection
      if (collection.attributes) {
        await createAttributes("672e4b2d000b362da616", collection.$id, collection.attributes);
      }



      console.log(`Collection ${collection.name} imported successfully with attributes and documents.`);
    }
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

// Run the import
importData();
