import { TEnvironment } from "./TEnvironment";

export const environment: TEnvironment = {
    production: true,
    msalConfig: {
        auth: {
            clientId: 'f75ef192-e196-45cb-ae4b-9523b0b80f4d',
            authority: 'https://login.microsoftonline.com/ddd56904-08bb-4352-88db-d7f4b5dbfde6'
        }
    },
    apiConfig: {
        scopes: ['api://903b669b-6aca-4d49-b8ba-1deaf37002aa/Characters.Read'],
        uri: 'https://relearn-angular-app.azurewebsites.net/'
    }
};