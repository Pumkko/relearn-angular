export type TEnvironment = {
    production: boolean;
    msalConfig: {
        auth: {
            clientId: string,
            authority: string,
        }
    },
    apiConfig: {
        scopes: string[],
        uri: string
    }
}
