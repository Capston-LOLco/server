import { Column, PrimaryColumn } from 'typeorm';

export class Cam {
  @PrimaryColumn()
  id: number;

  @Column()
  cam_id: string;

  @Column()
  user_id: string;

  @Column()
  cam_name: string;
}
