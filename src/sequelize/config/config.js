
const Configuration = {
  development: {
    username: "avnadmin",
    password: "AVNS_Vmne3XujMKC87-p6KMM",
    database: "nurturelabs",
    host: "pg-f64fddc-ak4032777-4df8.l.aivencloud.com",
    dialect: "postgres",
    port: 12181,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
export default Configuration;
