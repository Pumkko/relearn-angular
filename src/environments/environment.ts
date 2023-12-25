import { TEnvironment } from "./TEnvironment";

export const environment: TEnvironment = {
    production: true,
    msalConfig: {
        auth: {
            clientId: 'ENTER_CLIENT_ID',
            authority: 'ENTER_AUTHORITY/WITH_TENANT_ID'
        }
    },
    apiConfig: {
        scopes: ['ENTER_SCOPE'],
        uri: 'ENTER_URI'
    }
  };