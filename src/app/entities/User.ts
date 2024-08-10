import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

export interface IUserEssential {
    readonly user : string
    readonly name : string
    readonly email : string
}

@Entity("users")
export default class User implements IUserEssential {
    @PrimaryColumn({ name:"uid", type:"varchar" })
    uid! : string

    @Column({ name:"user_name", type:"varchar", unique:true, nullable:false, length:100 })
    user! : string

    @Column({ name:"full_name", type:"varchar", nullable:false, length:100 })
    name! : string

    @Column({ name:"email", type:"varchar", unique:true, nullable:false, length:100 })
    email! : string

    @CreateDateColumn({ name:"created_at", type:"timestamp", nullable:false })
    createdAt!: Date

    @CreateDateColumn({ name:"last_login_at", type:"timestamp", nullable:false })
    lastLoginAt!: Date
}

