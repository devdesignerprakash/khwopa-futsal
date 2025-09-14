import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import bcrypt from "bcryptjs";
import { IsEmail, IsNotEmpty, Length } from 'class-validator'
import { BookedByUser } from "./bookedbyUser.entity";
import { Like } from "./like.entity";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
 class User extends BaseEntity {
  @Length(3, 50, { message: "Full Name has not more than 50 characters" })
  @IsNotEmpty({ message: "Full Name is required" })
  @Column()
  fullName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(undefined, { message: 'Invalid email format' })
  @Column({ unique: true })
  email: string;


  @Length(3, 50, { message: 'Address must be between 3 and 50 characters' })
  @Column()
  address: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @Length(10, 10, { message: 'Phone number must be 10 digits' })
  @Column()
  phoneNumber: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToMany(() => BookedByUser, bookedByUser => bookedByUser.user)
  bookings?: BookedByUser[];

  @OneToMany(() => Like, like => like.user)
  likes?: Like[]

  @BeforeInsert()
  hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}


export default User;