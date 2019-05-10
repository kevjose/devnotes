# Terraform

1. Infrastructure as code
2. Automation of Infrastructure
3. Keep the infrastructure in a certain state
   eg: spin up 5 small machines, even if one is manually deleted terraform will try to bring 5 small instances when run next
4. Make infrastructure auditable
5. Keep infrastructre changes history in GIT
6. Ansible, chef etc have focus on automating the installation and configuration of software
7. Keep the machines in certain state
8. Terraform can automate provisioning of infrastructure
9. Works well with automation software like ansible to install software after infrastructure is provisioned.

Dowload terraform from terraform.io it will be a zip file:

```
$ cd terraform
$ unzip ../../Desktop/terraform_0.11.13_darwin_amd64.zip
$ export PATH=/Users/kevin/kevspace/terraform:$PATH # to include terraform as a command and :$PATH to retain existing paths.

$ terraform # to see
```

#### First steps in terraform - AWS setup

Spinning up an instance on AWS

1. Open AWS account
2. Create IAM admin user
3. Create terraform file to spin up t2.micro instance
4. Run terraform apply

```
provider "aws" {
  access_key = "ACCESS_KEY_HERE"
  secret_key = "SECRET_KEY_HERE"
  region     = "us-east-1"
}

resource "aws_instance" "example" {
  ami           = "ami-0f4ab593bd4e5b352"
  instance_type = "t2.micro"
}
```

```
$ terraform init # initialise the required plugins for provider etc
$ terraform plan out file
$ terraform apply file
$ rm file
# for production always out the plan and then apply to be really sure of what changes will be made.
$ terraform destroy
```
