import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ReportsController],
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [ReportsService],
})
export class ReportsModule {}
