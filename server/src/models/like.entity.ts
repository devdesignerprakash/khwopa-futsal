import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import User from "./user.entity";
import { Events } from "./events.entity";


@Entity()
export class Like extends BaseEntity{
   @ManyToOne(() => User, user => user.likes, {eager:true})
    user: User;

   @ManyToOne(()=> Events, program=>program.likes, {eager:true})
   events:Events;
}