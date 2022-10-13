import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Push {
    
    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    // user_id: string;

    // cam의 고유 id값, ip이든 아니든 유저를 구분할 수 있는 값이어야함
    @Column()
    cam_id: string;

}
