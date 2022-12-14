import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Push {
  @PrimaryGeneratedColumn()
  id: number;

  // cam의 고유 id값, ip이든 아니든 유저를 구분할 수 있는 값이어야함
  @Column()
  cam_name: string;

  @Column()
  created_at: string;

  @Column()
  user_id: string;
}
