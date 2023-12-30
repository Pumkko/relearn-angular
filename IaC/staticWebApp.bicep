

param location string

resource RelearnAngularAppClientStaticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: 'relearn-angular-client-static-web-app'
  location: location
   sku: {
    tier: 'Free'
    name: 'Free'
   }

}
