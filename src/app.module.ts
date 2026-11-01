import { Module } from '@nestjs/common';
import { MlModule } from './ml/ml.module.js';

@Module({
  imports: [MlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
