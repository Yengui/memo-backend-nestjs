import { Module } from '@nestjs/common';
import { PackService } from './pack.service';
import { PackController } from './pack.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pack } from './entities/pack.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Pack', schema: Pack }])],
  controllers: [PackController],
  providers: [PackService],
})
export class PackModule {}
