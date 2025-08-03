import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewAdmin } from "./admin.entity";
//import { AdminEntity } from "./admin.entity";
@Module({
    imports: [TypeOrmModule.forFeature(/*[AdminEntity]*/[NewAdmin])],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}