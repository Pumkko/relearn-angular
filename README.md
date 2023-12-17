# RelearnAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.1.

## What did I Learn
### ChangeStrategy.OnPush 
Played with OnPush a bit and learn the following thing : 
 - If component A is a parent of component B, and B has an input of a complex type, when A updates B might not see the changes if the reference to the complex type in A is the same
 - If A and B are not related to each other and are sharing data through a service, then that service can use signal() so that when A calls the service to write a new value, B can be rerendered
 Kept the code in playWithOnPush if i ever want to play with it again

### Deploy to Azure
Soooo i struggled a bit with that one :
Azure Static Webapp : very easy to setup i only had to change `output_location: "dist/relearn-angular/browser`
otherwise fairly easy i did try to make it use pnpm but without success

Azure Webapp : a bit more difficult, i had to : 
 - Remove call to `pnpm run test` because it required Chrome to run and i did not want to fix that right now
 - Change `zip release.zip ./* -r` to `zip release.zip ./dist/* -r` because it was putting EVERYTHING into the zip including node_modules
 - Update `package: ./dist/relearn-angular/browser` so it points to the right folder
 - Setup PNPM found a [github repo that explained it](https://github.com/pnpm/action-setup)
 - Also i needed to serve static file so i followed [this guide](https://nicolgit.github.io/how-deploy-angular-app-to-azure-appservice-running-linux-from-github/)  
   I basically needed to set this startup command under Configuration/General Settings in the web app
`pm2 serve /home/site/wwwroot --no-daemon --spa`

### Running on Azure
https://pumkko-relearn-angular-webapp.azurewebsites.net/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
