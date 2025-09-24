import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import bcrypt from "bcryptjs";
import { Like } from "./like.entity";
import { Booking } from "./booking.entity";
import { OTP } from "./otp.entity";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
 class User extends BaseEntity {
 
  @Column()
  fullName: string;


  @Column({ unique: true })
  email: string;


 
  address: string;

 
  @Column()
  phoneNumber: string;

  
  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({type:"boolean",default:false})
  isEmailVerified: boolean;

  @Column({type:"boolean", default:false})
  isUserVerified:boolean

  @Column({type:"boolean", default:true})
  isActive:boolean


  @OneToMany(() => Booking, booking => booking.user)
  bookings?: Booking[];

  @OneToMany(() => OTP, otp => otp.user, { cascade: true })
  otps?: OTP[]

  @OneToMany(() => Like, like => like.user)
  likes?: Like[]

  @BeforeInsert()
  hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}


export default User;