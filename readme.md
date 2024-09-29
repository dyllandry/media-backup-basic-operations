To run this you need:
* Authenticate with AWS using cli `aws sso login`
* Have an existing mediaBackup dynamodb table you can access with your signed in aws account. Primary key should be `{ pk: string, sk: string }`.
* Run `npm start`

