import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../common";
import { UserEntity } from "../../user/entities/user.entity";
import { TaskStatus } from "../task.types";


@Entity("tasks")
export class TaskEntity extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 52
    })
    title: string;

    @Column({
        length: 10000
    })
    description: string;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.Created
    })
    status: TaskStatus;

    @Column({
        type: "date",
        nullable: true,
    })
    dueDate: Date | null;

    // TODO:
    // @ManyToMany()
    // tags: Tag[] || labels: Label[]

    // @ManyToOne()
    // category: Category;

    // Можно сделать и в тегах
    // @OneToMany()
    // @Column({
    //     nullable: true
    // })
    // priority: Priority;

    // @Column({
    //     nullable: true
    // })
    // startDate: Date;

    /* Relations */
    @ManyToOne(() => UserEntity, (user) => user.tasks, {
        nullable: false
    })
    user: UserEntity;
}
