import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { LearnerDto } from './dto/learner.dto';
import { Learner } from './learner.entity';
import { v4 as uuidv4} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { LearnerPayload } from './learner-payload.interface';

@Injectable()
export class LearnerService {
    constructor(@InjectRepository(Learner) private readonly learnerRepo : Repository<Learner>){}
    
    //23505 error not handled
    async createLearner(learnerDto : LearnerDto) : Promise<{message : string}>{
        const {name, email, phone, password , gender, imageUrl} = learnerDto;
        const newLearner : Learner = this.learnerRepo.create({
            name,
            email,
            phone: BigInt(phone),
            password,
            gender,
            imageUrl,
        });
        await this.learnerRepo.save(newLearner);
        return {message : 'User created'};
    }

    async getLearnerById(userId : string) : Promise<LearnerPayload> {
        const foundLearner = await this.learnerRepo.findOneBy({id : userId});
        if(!foundLearner){
            throw new NotFoundException("User Not Found");
        }
        const learnerPayload : LearnerPayload = {
            id: foundLearner.id,
            name: foundLearner.name,
            email: foundLearner.email,
            phone: foundLearner.phone.toString(),
            gender: foundLearner.gender,
            imageUrl: foundLearner.imageUrl,
            isActive: foundLearner.isActive,
            created_at: foundLearner.created_at,
            updated_at: foundLearner.updated_at
        }
        return learnerPayload;
    }

    async updatePhoneNumberById(id : string, phone : BigInt) : Promise<LearnerPayload> {
        const foundLearner = await this.learnerRepo.findOneBy({id : id});
        if(!foundLearner){
            throw new NotFoundException();
        }
        foundLearner.phone = phone;
        try{
            await this.learnerRepo.save(foundLearner);
        }
        catch(error){
            if(error.code === '23505'){
                throw new ConflictException('Phone number already exist');
            }

        }
        return await this.getLearnerById(id);
    }

    async deleteLearnerById(id : string) : Promise<void> {
        const foundLearner = await this.getLearnerById(id);
        if(!foundLearner){
            throw new BadRequestException("Something went wrong");
        }
        await this.learnerRepo.delete({id : id});        
    }

    async getAllLearners() : Promise<Learner[]>{
        const learners : Learner[] = await this.learnerRepo.find();
        return learners;        
    }

    
    async getUserNamedNull() : Promise<Learner[]>{
        const learners : Learner[] = await this.learnerRepo.find({
            where : {
                name: IsNull()
            }
        });
        return learners;
    }

    async updateNameById(id : string , name: string) : Promise<void>{}

    

    // async updateImageById(id : string , imageUrl : string) : Promise<Learner> {
    //     let updateableLearner : Learner = await this.getLearnerById(id);
    //     this.learners = this.learners.filter(learner => learner !== updateableLearner);
    //     updateableLearner.imageUrl = imageUrl;
    //     this.learners.push(updateableLearner);
    //     return updateableLearner;
    // }

}
