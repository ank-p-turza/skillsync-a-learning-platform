import { Controller, Post, Body, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, Param, Get, Patch, Delete } from '@nestjs/common';
import { LearnerService } from './learner.service';
import { LearnerDto } from './dto/learner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { LearnerPayload } from './learner-payload.interface';
import { LearnerUpdateDto } from './dto/learner-update.dto';
import { Learner } from './learner.entity';

@Controller('learner')
export class LearnerController {
    constructor (private readonly learnerService : LearnerService){}

    @Post('/signup')
    @UseInterceptors(FileInterceptor('image', {
        fileFilter: (req, file, cb)=>{
            if(file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/i)){
                cb(null,  true);
            }
            else{
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'Only images are allowed'), false);
            }
        },
        limits: {fileSize : 2000000},
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb)=> {
                cb(null, Date.now()+file.originalname);
            }
        })        
    }))
    @UsePipes(new ValidationPipe())
    async signUp(@Body() learnerDto : LearnerDto, @UploadedFile() image: Express.Multer.File) : Promise<{message: string}> {
        if(!image){
            learnerDto.imageUrl = "";
        }
        else{
            learnerDto.imageUrl = image.path;
        }
        return await this.learnerService.createLearner(learnerDto);
    }

    @Get("/:id")
    async getDetails(@Param('id') id : string) : Promise<LearnerPayload>{
        return await this.learnerService.getLearnerById(id);
    }

    @Patch('/:id/phone')
    async updatePhone(@Param('id') id : string, @Body() learnerUpdateDto : LearnerUpdateDto) : Promise<LearnerPayload> {
        const {phone} = learnerUpdateDto;
        console.log(learnerUpdateDto);
        try{
            const phoneNo : BigInt = BigInt(phone);
            return await this.learnerService.updatePhoneNumberById(id, phoneNo);
        }
        catch(error){
            console.log(error);
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id : string) : Promise<void> {
        await this.learnerService.deleteLearnerById(id);
    }

    @Get()
    async getAllUsers() : Promise<Learner[]>{
        return await this.learnerService.getAllLearners();
    }

    @Get('/user/null')
    async getUserNamedNull() : Promise<Learner[]>{
        return await this.learnerService.getUserNamedNull();
    }

    





/*

    @UsePipes(new ValidationPipe())
    @Patch()
    async updateName(@Body() learnerDto : LearnerDto) : Promise<Learner> {
        const {id , name} = learnerDto;
        return await this.learnerService.updateNameById(id, name);
    }

    @Get()
    async getAllLearners() : Promise<Learner[]>{
        return await this.learnerService.getAllLearners();
    }

    @Post("/updateimage")
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('image', {
        fileFilter: (req, file, cb)=>{
            if(file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/i)){
                cb(null,  true);
            }
            else{
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'Only images are allowed'), false);
            }
        },
        limits: {fileSize : 2000000},
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb)=> {
                cb(null, Date.now()+file.originalname);
            }
        })        
    }))
    async updateImage(@Body('id') id : string ,  @UploadedFile() image: Express.Multer.File){
        return await this.learnerService.updateImageById(id, image.path);
    }
*/


}
