export const config = {
  env: process.env.NODE_ENV || 'development',

  app: {
    port: process.env.NODE_PORT || 3000,
  },

  db: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root_pwd',
    database: process.env.MYSQL_DATABASE || 'isearch',
  },
};
