const { Pool } = require("pg");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
require("dotenv").config();

const getProductionConfig = async () => {
  const client = new SecretManagerServiceClient();

  // Fetch secrets from GCP Secret Manager
  const [dbUser] = await client.accessSecretVersion({
    name: "projects/YOUR_PROJECT_ID/secrets/DB_USER/versions/latest",
  });
  const [dbPassword] = await client.accessSecretVersion({
    name: "projects/YOUR_PROJECT_ID/secrets/DB_PASSWORD/versions/latest",
  });
  const [dbHost] = await client.accessSecretVersion({
    name: "projects/YOUR_PROJECT_ID/secrets/DB_HOST/versions/latest",
  });
  const [dbName] = await client.accessSecretVersion({
    name: "projects/YOUR_PROJECT_ID/secrets/DB_NAME/versions/latest",
  });

  return {
    host: dbHost.payload.data.toString(),
    user: dbUser.payload.data.toString(),
    password: dbPassword.payload.data.toString(),
    database: dbName.payload.data.toString(),
  };
};

const getDatabaseConfig = async () => {
  // if (process.env.NODE_ENV === "production") {
  //   return await getProductionConfig();
  // }

  // Development configuration (from .env)
  return {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  };
};

const createDatabasePool = async () => {
  const config = await getDatabaseConfig();
  return new Pool(config);
};

module.exports = createDatabasePool;
