import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MlController } from './ml.controller.js';
import { MlService } from './ml.service.js';

@Module({
  imports: [HttpModule],
  controllers: [MlController],
  providers: [MlService],
  exports: [MlService],
})
export class MlModule {}
