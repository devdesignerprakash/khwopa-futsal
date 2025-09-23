import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import User from "./user.entity";



@Entity()
export class OTP extends BaseEntity {
    @Column()
    otp: string;

    @Column()
    expiresAt?: Date;


    @Column({ type: "boolean", default: false })
    isUsed: boolean;

    @ManyToOne(() => User, user => user.otps, { onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "user_id" })
    user?: User;


}