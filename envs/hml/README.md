# Homolog environment deploy

## Prerequisites

## Deploy

Instructions to AWS infrastructure deployment.

First, set the correct vars in `.tf` file (prefix `SET_VAR_`).

Then, in `terraform` dir, run:

```shell
terraform init
terraform plan
terraform apply
```

After this, you can go to `api` dir, set the correct values (prefix `SET_VAR_`) and deploy:

```shell
npm i
npm run build
serverless deploy --stage hml
```

Or use the created action to deploy the serverless project.
