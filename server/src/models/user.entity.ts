import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import bcrypt from "bcryptjs";
import { IsEmail, IsNotEmpty, Length } from 'class-validator'
import { Like } from "./like.entity";
import { Booking } from "./booking.entity";

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

  @OneToMany(() => Booking, booking => booking.user)
  bookings?: Booking[];

  @OneToMany(() => Like, like => like.user)
  likes?: Like[]

  @BeforeInsert()
  hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}


export default User;