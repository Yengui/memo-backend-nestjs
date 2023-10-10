import { Injectable } from '@nestjs/common';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PackInterface } from './entities/pack.entity';

@Injectable()
export class PackService {
  constructor(
    @InjectModel('Pack') private readonly Pack: Model<PackInterface>,
  ) {}

  async create(createPackDto: CreatePackDto, user: string) {
    const newPack = new this.Pack({ ...createPackDto, user });
    const pack = await newPack.save();
    return pack;
  }

  async findAll() {
    return await this.Pack.find();
  }

  async findOne(id: string) {
    return await this.Pack.findById(id);
  }

  async update(id: string, updatePackDto: UpdatePackDto) {
    return await this.Pack.findByIdAndUpdate(
      id,
      { ...updatePackDto },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.Pack.findByIdAndDelete(id);
  }
}
