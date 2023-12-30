

param location string

resource RelearnAngularAppClientStaticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: 'relearn-angular-client-static-web-app'
  location: location
  properties: {
    provider: 'GitHub'
    repositoryUrl: 'https://github.com/Pumkko/relearn-angular'
    branch: 'master'
    repositoryToken: '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'
    buildProperties: {
      appLocation: '/'
      apiLocation: '' 
      outputLocation: 'dist/relearn-angular/browser'
    }
  }
   sku: {
    tier: 'Free'
    name: 'Free'
   }

}
