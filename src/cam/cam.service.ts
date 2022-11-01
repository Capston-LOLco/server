import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCamDto } from './dto/create-cam.dto';
import { UpdateCamDto } from './dto/update-cam.dto';
import { Cam } from './entities/cam.entity';

@Injectable()
export class CamService {
  constructor(
    @InjectRepository(Cam)
    private readonly camRespository: Repository<Cam>,
  ) {
    this.camRespository = camRespository;
  }

  async create(createCamDto: CreateCamDto): Promise<Cam> {
    const { cam_id, cam_name, user_id } = createCamDto;

    const cam = this.camRespository.create({
      cam_id,
      cam_name,
      user_id,
    });

    const savedCam = await this.camRespository.save(cam);

    return savedCam;
  }

  async getUserIdByCamId(cam_id: string): Promise<string> {
    const user = await this.camRespository.findOne({
      where: {
        cam_id,
      },
    });

    return user.user_id as string;
  }
}
