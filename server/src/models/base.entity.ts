import { BeforeInsert, Entity,PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string
    @BeforeInsert()
    genrateId(){
        this.id=uuidv4()
    }
}