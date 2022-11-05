"use strict";
exports.__esModule = true;
exports.typeOrmConfig = void 0;
exports.typeOrmConfig = {
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'todol',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    autoLoadEntities: true
};
