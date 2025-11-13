import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database/database.module';

@Module({
  imports: [DatabaseModule], // config database
  controllers: [],
  providers: [],
})
export class AppModule {}
