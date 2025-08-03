import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LearnerModule } from './learner/learner.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [LearnerModule, TypeOrmModule.forRoot({
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 'postgres',
    database : 'skillsync',
    password : 'root',
    autoLoadEntities : true,
    synchronize : true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
