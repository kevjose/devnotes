# Procedure Document

#### AWS Setup

There is a lecture on how to setup AWS, here are some notes to clarify the setup
Make sure you have installed the AWS CLI

If you're on linux you can also use `sudo pip install --upgrade awscli`
If you don't have pip, try sudo apt-get install python-pip

Use "aws configure" to enter the keys
you can optionally specify a default region - but no worries, in terraform you can set any region you want

Use http://www.cloudping.info/ to determine your region

You can test whether it works by entering: aws iam get-user

This will also show your AWS userid which you need afterwards

#### Useful Commands

> \$ terraform plan # plan

> \$ terraform apply # shortcut for plan & apply - avoid this in production

> \$ terraform plan -out out.terraform # terraform plan and write the plan to out file

> \$ terraform apply out.terraform # apply terraform plan using out file

> \$ terraform show # show current state

> \$ cat terraform.tfstate # show state in JSON format
