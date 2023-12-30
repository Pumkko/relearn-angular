

param location string

resource RelearnAngularAppClientStaticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: 'relearn-angular-client-static-web-app'
  location: location
  properties: {
    provider: 'Github'
    repositoryUrl: 'https://github.com/Pumkko/relearn-angular'
    branch: 'master'
    buildProperties: {
      skipGithubActionWorkflowGeneration: true
    }
  }
   sku: {
    tier: 'Free'
    name: 'Free'
   }

}
