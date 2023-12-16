# RelearnAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.1.

## What did I Learn
### OnPush 
Played with OnPush a bit and learn the following thing : 
 - If component A is a parent of component B, and B has an input of a complex type, when A updates B might not see the changes if the reference to the complex type in A is the same
 - If A and B are not related to each other and are sharing data through a service, then that service can use signal() so that when A calls the service to write a new value, B can be rerendered
 Kept the code in playWithOnPush if i ever want to play with it again

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
