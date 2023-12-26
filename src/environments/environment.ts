import { TEnvironment } from "./TEnvironment";

export const environment: TEnvironment = {
    production: true,
    msalConfig: {
        auth: {
            clientId: '{{MSAL_AUTH_CLIENTID}}',
            authority: '{{MSAL_AUTHORITY_WITH_TENANT_ID}}'
        }
    },
    apiConfig: {
        scopes: [{{API_SCOPE}}],
        uri: '{{API_URL}}'
    }
};