module.exports = {
  apps: [
    {
      name: "gcp-compute-test",
      script: "index.js",
      env: {
        NODE_ENV: process.env.NODE_ENV,
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
      },
    },
  ],
};
