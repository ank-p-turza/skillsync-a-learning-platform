import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
/*
@Entity("admin")
export class AdminEntity
{
    @PrimaryGeneratedColumn()
    id : number;
    @Column({name : "fullname", type: "varchar"})
    name : string;
    @Column({ length: 50})
    email : string;
    @Column()
    password : string;
}
    */
   // New
   @Entity('admin')
   export class NewAdmin
   {
    @PrimaryGeneratedColumn('increment', {type : 'int', unsigned : true})
    id: number;
    @Column({type : 'varchar', length : 100, nullable : false})
    fullname: string;
    @Column({type : 'int', unsigned : true, nullable : false})
    age: number;
    @Column({
        type : 'enum',
        enum : ['active', 'inactive'],
        default : 'active',
    })
    status: 'active' | 'inactive';

   }