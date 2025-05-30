import { EntitySchema } from 'typeorm';

const RefreshToken = new EntitySchema({
    name: "RefreshToken",
    tableName: "refresh_tokens",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        userId: {
            type: "int",
            name: "user_id"
        },
        token: {
            type: "varchar",
        },
        created_at: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        expires_at: {
            type: "timestamp",
            nullable: false
        },
    },
});
export default RefreshToken;