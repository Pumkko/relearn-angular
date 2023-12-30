

param location string
@secure()
param GITHUB_TOKEN string

resource RelearnAngularAppClientStaticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: 'relearn-angular-client-static-web-app'
  location: location
  properties: {
    provider: 'GitHub'
    repositoryUrl: 'https://github.com/Pumkko/relearn-angular'
    branch: 'master'
    repositoryToken: GITHUB_TOKEN
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
