import { EntitySchema } from 'typeorm';

const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        username: {
            type: "varchar",
            unique: true,
            nullable: false,
        },
        password: {
            type: "varchar",
            nullable: false,
        },
    },
});
export default User;