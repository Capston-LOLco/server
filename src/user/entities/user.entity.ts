import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: string;

    @Column()
    user_name: string;

    @Column()
    user_email: string;

    @Column({
        type: 'varchar',
        length: '1000',
      })
    user_hash: string;

    @Column({
        type: 'varchar',
        length: '1000',
      })
    user_salt: string;

}
