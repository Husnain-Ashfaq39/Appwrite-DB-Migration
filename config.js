// config.js
module.exports = {
    export: {
        endpoint: 'https://centralapps.hivefinty.com/v1', // e.g., 'https://cloud.appwrite.io/v1'
        projectId: '66fbcc72001251d28def',
        apiKey: 'standard_ac48b50124e40dec7d813fa777d545f88e804b65bc5523aac661b49b7d4c648b57e58d2902df6ff260bf8da465f8ff584e17aaeec92d74599861cfdd9584486f75b62be45e2b894daddc9d8e6da37848e0199dabe8f6e9d0ac6c0a131fea8cdc27a80cc2412da4000a68e84f8c02c9679455371ec1a2e72bb810782dd401c155',
        outputFile: 'exported_collections.json'
    },
    import: {
        endpoint: 'https://[TARGET_APPWRITE_ENDPOINT]', // e.g., 'https://cloud.appwrite.io/v1'
        projectId: 'TARGET_PROJECT_ID',
        apiKey: 'TARGET_API_KEY',
        inputFile: 'exported_collections.json'
    }
};
