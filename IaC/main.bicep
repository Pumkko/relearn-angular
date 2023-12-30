@description('Specifies the location for resources.')
param location string = 'eastus'

targetScope='subscription'

resource relearnAngularClientRg 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: 'relearn-angular-app-client-rg'
  location: location
}

module staticWebAppModule 'staticWebApp.bicep' = {
  name: 'staticWebAppModule'
  scope: relearnAngularClientRg
  params: {
    location: 'eastus2'
  }
}
