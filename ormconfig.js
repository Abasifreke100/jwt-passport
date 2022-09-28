const {
  DATABASE_TYPE,
  MYSQL_HOST,
  DATABASE_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  DATABASE_SYNC,
} = process.env;

module.exports = {
  type: DATABASE_TYPE,
  host: MYSQL_HOST,
  port: DATABASE_PORT,
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  synchronize: DATABASE_SYNC,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  seeds: ['module/common/database/seeds/**/*{.ts,.js}'],
  factories: ['module/common/database/factories/**/*{.ts,.js}'],
};
