
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.1.

## Running on Azure
https://zealous-wave-04311a60f.4.azurestaticapps.net

# What did I Learn

## ChangeStrategy.OnPush

Played with OnPush a bit and learn the following thing :
- If component A is a parent of component B, and B has an input of a complex type, when A updates B might not see the changes if the reference to the complex type in A is the same
- If A and B are not related to each other and are sharing data through a service, then that service can use signal() so that when A calls the service to write a new value, B can be rerendered

Kept the code in playWithOnPush if i ever want to play with it again

## Deploy to Azure

Soooo i struggled a bit with that one :
Azure Static Webapp : very easy to setup i only had to change `output_location: "dist/relearn-angular/browser`
otherwise fairly easy i did try to make it use pnpm but without success
Azure Webapp : a bit more difficult, i had to :

- Change `zip release.zip ./* -r` to `zip release.zip ./dist/* -r` because it was putting EVERYTHING into the zip including node_modules
- Update `package: ./dist/relearn-angular/browser` so it points to the right folder
- Setup PNPM found a [github repo that explained it](https://github.com/pnpm/action-setup)
- Also i needed to serve static file so i followed [this guide](https://nicolgit.github.io/how-deploy-angular-app-to-azure-appservice-running-linux-from-github/)

I basically needed to set this startup command under Configuration/General Settings in the web app

`pm2 serve /home/site/wwwroot --no-daemon --spa`

I dropped it later because i did not think it was that interesting to have a full webapp for a angular app

## The bootstrap problem

To deploy the Static Web app i need to call this github action `Azure/static-web-apps-deploy@v1`
but it requires a deployment Token that is generated when the swa is created, so not available at first
I tried :
- To run a  `az cli` command to get the secret token after bicep has ran and pass it to the `static-web-apps-deploy@v1`
It did not work because for some reasons the token always end up being invalid. Even though it's not (tried to use to manually deploy and it worked fine)
  
- The other way could be (but not tried it seems to complicated). Make a first workflow file that runs the bicep code, let the bicep code generate a new static web app with a new workflow file. Once this step is completed update the new workflow file with an event trigger like 
```
yaml
  workflow_run:
    workflows: [Run Tests]
```

This way we have on workflow to deploy the SWA and one to run bicep.

I eventually decided that it was just too complicated, and accepting the bootstrap problem is "okay". let bicep run, make the SWA but deactive workflow generation. Create a new GITHUB secret with the deployment Token after bicep has run. Of course it means the first deploy will fail to actually deploy the web app it will just create it on azure.

- The other problem is the SPA redirect URIs, when a new SWA is created on Azure, the name is completely random, i tried to run a AZ command during the build to get the new URI and add it to the App registration but i faced two problems : 
  - First az ad app update does not allow us to update an SPA this is well known problem : https://github.com/Azure/azure-cli/issues/25766
  - Two the way to do it using az rest worked when i ran it with my admin credentials but i failed to run it using generated az ad sp create-for-rba credentials even with an admin role. 
  
## Secrets 
At first I struggled with that, what if I have secrets in my environment.ts ? So in the environment.ts i wrote placeholder like :
```
{
  mySecrets: '{{SECRETS_VALUE}}'
}
```
And then I stored `SECRETS_VALUE` as a Github environment secrets and replace the token during the build. I did not like it so much
Why can't i use an `env` file like in React, Solid or else ? Then again i though about something. clients should not have secrets. What kind of secrets could the clients ever need ? for me the answer is none, the API should manage those secrets, access the Database, read a keyvault, access a secure storage...