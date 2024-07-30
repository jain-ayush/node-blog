import { Sequelize } from "sequelize"

const connectDB = new Sequelize(
  'node_react',
  'root',
  '',
   {
     host: '127.0.0.1',
     dialect: 'mysql'
   }
 );
 connectDB.authenticate().then(() => {
     console.log('Connection has been established successfully.');
  }).catch((error) => {
     console.error('Unable to connect to the database: ', error);
  });


export default connectDB;

