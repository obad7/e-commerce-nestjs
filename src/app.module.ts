import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI as string), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
