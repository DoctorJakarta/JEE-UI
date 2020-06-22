export enum USER_ROLE {
    ADMIN = 'ADMIN',
    PUBLIC = 'PUBLIC'
}

export class User {
    public id: number;
    public username: string;
    public password: string;
    public role: any;	// Comes from JSON binding as a string 'ADMIN', 'PUBLIC'

}
