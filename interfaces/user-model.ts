import { User } from './user';
import { Document } from 'mongoose';
export interface UserModel extends Document, User {
    /**
     * Validates a given password by looking into the db
     * @param password Password string
     */
    validPassword(password: string): boolean;
    
    /**
     * Sets the hash and salt into the db
     * @param password 
     */
    setPassword(password: string): void;
    /**
     * Generates a signed JWT
     */
    generateJWT(): string;
}
