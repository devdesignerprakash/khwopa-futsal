import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Like } from "./like.entity";


export enum EventStatus{
    UPCOMING="upcoming",
    COMPLETED="completed"

}

@Entity()
export class Events extends BaseEntity{
    @Column()
    title:string

    @Column()
    description:string

    @Column("text",{array:true,nullable:true})
    images?:string[]
    

    
    @Column("text",{array:true,nullable:true})
    videos?:string[]

    @Column({
        type:"enum",
        enum:EventStatus
    })
    status:EventStatus

    @OneToMany(()=>Like,like=>like.events)
    likes?:Like[]
}