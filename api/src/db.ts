import {Sequelize} from 'sequelize-typescript';
import config from '../config';
config;

export const sequelize =
	process.env.NODE_ENV === 'production'
		? new Sequelize({
				database: config.dbName,
				dialect: 'postgres',
				host: config.dbHost,
				port: config.dbPort as number,
				username: config.dbUser,
				password: config.dbPassword,
				pool: {
					max: 3,
					min: 1,
					idle: 10000,
				},
				dialectOptions: {
					ssl: {
						require: true,
						//Ref: https://github.com/brianc/node-postgres/issues/2009
						rejectUnauthorized: false,
					},
					keepAlive: true,
				},
				ssl: true,
        storage: ':memory:',
        models: [__dirname + '/models'],
		  })
		: new Sequelize({
          dialect: 'postgres',
          database: config.dbName,
          password: config.dbPassword,
          username: config.dbUser,
          storage: ':memory:',
          models: [__dirname + '/models'],
          logging:false
          });


// export const sequelize = new Sequelize({
//  dialect: 'postgres',
//  database: config.dbName,
//  password: config.dbPassword,
//  username: config.dbUser,
//  storage: ':memory:',
//  models: [__dirname + '/models'],
//  logging:false,
//  ssl: true,
//  dialectOptions:{
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,  
//     },
//     keepAlive: true,
//  }
// });
