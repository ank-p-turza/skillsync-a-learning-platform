import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { LearnerGender } from "./gender-enum";
import { v4 as uuidv4 } from  'uuid';

@Entity('learners')
export class Learner{

    @PrimaryColumn()
    id : string;

    private generateRandomString(length : number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    @BeforeInsert()
    async generateId() : Promise<void> {
        const uuidStr : string = uuidv4();
        const timenow : number = Date.now();
        const timeString : string = timenow.toString();
        const randomString : string = this.generateRandomString(7);
        const userId : string =  timeString.substring(8,12) + randomString.charAt(2) + '-'
                                + timeString.charAt(12) + randomString.substring(3,7) + '-'
                                + uuidStr.substring(18,36);
        this.id = userId;
    }


    
    @Column({type : 'varchar', default: null})
    name : string;
    
    @Column({unique: true})
    email : string;

    
    @Column({type: 'bigint', unsigned: true, unique: true})
    phone : BigInt;
    
    @Column()
    password : string;
    
    @Column({type: 'enum', enum: LearnerGender, nullable : true, default: null})  
    gender : LearnerGender | null;
    
    @Column({nullable : true})
    imageUrl : string;
        
    @Column({default : false})
    isActive : boolean;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at : Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updated_at : Date;



}