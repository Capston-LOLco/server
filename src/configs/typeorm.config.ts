import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'todol',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    autoLoadEntities: true,
}