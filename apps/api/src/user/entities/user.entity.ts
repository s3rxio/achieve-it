import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  @Exclude()
  password!: string;

  @Column({
    nullable: true,
    type: String
  })
  @Exclude()
  refreshToken?: string | null;
}
