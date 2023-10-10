import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PackService } from './pack.service';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('pack')
export class PackController {
  constructor(private readonly packService: PackService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPackDto: CreatePackDto, @Request() req) {
    return this.packService.create(createPackDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.packService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackDto: UpdatePackDto) {
    return this.packService.update(id, updatePackDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packService.remove(id);
  }
}
