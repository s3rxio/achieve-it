import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../common";
import { TaskEntity } from "../../task/entities/task.entity";

@Entity("users")
export class UserEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  /* TODO: Вынести вообще всю работу с токенами в отдельный сервис и сделать хранение в Redis */
  @Column({
    nullable: true,
    type: String
  })
  @Exclude()
  refreshToken?: string | null;

  /* TODO: Добавить роли */
  @Column({
    default: false
  })
  isAdmin: boolean;

  /* Relations */
  @OneToMany(() => TaskEntity, task => task.user)
  tasks?: TaskEntity[];
}
