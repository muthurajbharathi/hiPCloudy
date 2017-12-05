Project: Android Tradie


Repo for Automated tests using Appium

Project: Android Consumer

# android-tradie

## Installation
`yarn install`

## Smoke suites
### Setup:
Run inside tests-api directory (where x is the service ID for your account): `node sanitySetup.js x` 

### Running
Run inside tradie directory: `yarn start -- --suite=smoke`

## Clean up:
1. In tests-api `node sanityTeardown.js`
2. That's it
