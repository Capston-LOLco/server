import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CamService } from './cam.service';
import { CreateCamDto } from './dto/create-cam.dto';
import { UpdateCamDto } from './dto/update-cam.dto';

@Controller('cam')
export class CamController {
  constructor(private readonly camService: CamService) {}

  @Post()
  create(@Body() createCamDto: CreateCamDto) {
    return this.camService.create(createCamDto);
  }

  @Get()
  findAll() {
    return this.camService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.camService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCamDto: UpdateCamDto) {
    return this.camService.update(+id, updateCamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.camService.remove(+id);
  }
}
