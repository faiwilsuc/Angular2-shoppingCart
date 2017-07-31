export interface User {
    uid: string;
    email: string;
    password: string;
    confirmPassword?: string;
    displayName: string;
    cin7ID: string;
    billingAddress: string;
}