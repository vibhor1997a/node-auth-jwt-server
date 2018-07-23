export interface User {
    name: string;
    uname: string;
    hash: string;
    salt: string;
    password?: string;
}
