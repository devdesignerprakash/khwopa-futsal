import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, "../models/*.entity.ts")],
  synchronize: true,
  // dropSchema:true
});
export const DbConnection = async () => {
  try {
    await AppDataSource.initialize();
    const user = AppDataSource.getRepository("User");
    const existAdmin = await user.findOne({
      where: [{ role: "admin" }],
    });
    if (!existAdmin) {
      const admin = user.create({
        fullName:"Prakash Neupane" ,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        phoneNumber: process.env.ADMIN_PHONE,
        address: "Bhaktapur Nepal",
        isEmailVerified: true,
        isUserVerified:true,
        isActive: true,
        role: "admin",
      });
      await user.save(admin);
      console.log("admin created");
    } else {
      console.log("admin already exists");
    }
  } catch (error) {
    console.error("Error during Data Source initialization", error);
  }
};
