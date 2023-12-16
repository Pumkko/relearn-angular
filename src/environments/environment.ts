
export type Environment = {
    production: boolean;
    auth0Domain: string;
    auth0ClientId: string
}

export const environment: Environment = {
    production: false,
    auth0Domain: '',
    auth0ClientId: ''
};
