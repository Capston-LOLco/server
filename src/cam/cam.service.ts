/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCamDto } from './dto/create-cam.dto';
import { CreateCoordinateDto } from './dto/create-coordinate.dto';
// import { UpdateCamDto } from './dto/update-cam.dto';
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

  async findOne(cam_id: string): Promise<Cam> {
    try {
      const found = await this.camRespository.findOne({
        where: {
          cam_id,
        },
      });
      return found;
    } catch {
      throw new Error('캠에 대한 정보가 존재하지 않습니다.');
    }
  }

  async createCoodinate(createCoordinateDto: CreateCoordinateDto): Promise<Cam> {
    const { user_id, coordinate } = createCoordinateDto;

    const cam = await this.camRespository.findOne({
      where: {
        user_id,
      },
    });

    cam.coordinate = coordinate;

    const result = await this.camRespository.save(cam);

    return result;
  }
}
