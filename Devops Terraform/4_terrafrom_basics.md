# Terraform Basics

# Variables

1. Everything in one file, not great
2. Use Variables to hide secret
3. AWS creds should not be in git repo.
4. Use Variables where the value might change, like the ami-id per region in the first-step example.
5. Use terraform variables to make reusable terraform filess

```
# provider.tf
provider 'aws' {
  access_key = '${var.AWS_ACCESS_KEY}'
  secret_key = '${var.AWS_SECRET_KEY}'
  region = '${var.AWS_REGION}'
}
```

```
# vars.tf
variable 'AWS_ACCESS_KEY' {}
variable 'AWS_SECRET_KEY' {}
variable 'AWS_REGION' {
  default = 'ap-south-1'
}
variable 'AMIS' {
  type = 'map'
  default = {
    us-east-1 = 'SOME_AMI_ID'
    ap-south-1 = 'ami-0f4ab593bd4e5b352'
  }

}

```

```
# terraform.tfvars
AWS_ACCESS_KEY = ''
AWS_SECRET_KEY = ''
AWS_REGION = ''
```

```
# instance.tf
resource 'aws_instance' 'example'{
  <!-- ami = 'ami-0f4ab593bd4e5b352' -->
  ami = '${lookup(var.AMIS, var.AWS_REGION)}'
  instance_type = 't2.micro'
}
```

# Software Provisioning

1. Different ways to provision
2. Build custom ami and bundle software with the image (Packer is a great tool to do the same)
3. Boot Standard AMI, install software you need via, file upload, using remote exec, using automation tool like chef, puppet, ansible
4. For ansible, you can run terraform first, output the ip address and then run ansible-playbook on those hosts, this can be automated in a workflow script

#### File upload

```
# instance.tf
resource 'aws_instance' 'example'{
  ami = '${lookup(var.AMIS, var.AWS_REGION)}'
  instance_type = 't2.micro'
}
provisioner "file" {
  source = "app.conf"
  destination = "/etc/app.conf"
  connection {
    user = "${var.instance_username}"
    password = "${var.instance_password}"
  }
}
```

1. file upload is an easy way to uplad scripts
2. can be used with remote-exec to execute a script
3. the provisoner uses ssh with linux
4. To override the ssh default use connection, default user in amazon ami is `ec2-user` for ubuntu it is `ubuntu`
5. Need key value pair to login to instance, need private and public key for the same
6. After we upload the script we ant to execute the same
7. we can execute the script using `remote-exec`

```
resource "aws_key_pair" "mykey" {
  key_name = "mykey"
  public_key = "${file("${var.PATH_TO_PUBLIC_KEY}")}"
}

resource "aws_instance" "example" {
  ami = "${lookup(var.AMIS, var.AWS_REGION)}"
  instance_type = "t2.micro"
  key_name = "${aws_key_pair.mykey.key_name}"

  provisioner "file" {
    source = "script.sh"
    destination = "/tmp/script.sh"
  }
  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/script.sh",
      <!-- +x makes the file executable -->
      "sudo /tmp/script.sh"
    ]
  }
  connection {
    user = "${var.INSTANCE_USERNAME}"
    private_key = "${file("${var.PATH_TO_PRIVATE_KEY}")}"
  }
}
```

```
$ vim terraform.tfvars
# enter aws access and secret key
# create keys
$ ssh-keygen -f mykey
# the above will create and private and public key, (mykey, mykey.pub)
```

```
# vars.tf

variable "AWS_ACCESS_KEY" {}
variable "AWS_SECRET_KEY" {}
variable "AWS_REGION" {
  default = "eu-west-1"
}
variable "AMIS" {
  type = "map"
  default = {
    us-east-1 = "ami-13be557e"
    us-west-2 = "ami-06b94666"
    eu-west-1 = "ami-844e0bf7"
  }
}

variable "PATH_TO_PRIVATE_KEY" {
  default = "mykey"
}
variable "PATH_TO_PUBLIC_KEY" {
  default = "mykey.pub"
}
variable "INSTANCE_USERNAME" {
  default = "ubuntu"
}
```

`Using secruity groups we can open ssh port so that we can log in to the instance, for now do it manually via aws console`

```
# script.sh

#!/bin/bash

# sleep until instance is ready
until [[ -f /var/lib/cloud/instance/boot-finished ]]; do
  sleep 1
done

# install nginx
apt-get update
apt-get -y install nginx

# make sure nginx is started
service nginx start
```

# Output in terraform

1. Terraform keeps attributes of all resource we create
2. eg: `aws_resource` has attribute `public_ip`
3. These attributes can be queried and output, this can be used to feed to external softwares or to just view valuable information
4. use `output` to display public ip of aws resource

```
resource "aws_instance" "example" {
  ami = "${lookup(var.AMIS, var.AWS_REGION)}"
  instance_type = "t2.micro"
}
output "ip" {
    value = "${aws_instance.example.public_ip}"
}
```

5. You can also use attributes in a script

```
resource "aws_instance" "example" {
  ami = "${lookup(var.AMIS, var.AWS_REGION)}"
  instance_type = "t2.micro"
  provisioner "local-exec" {
     command = "echo ${aws_instance.example.private_ip} >> private_ips.txt"
  }
}
output "ip" {
    value = "${aws_instance.example.public_ip}"
}
```

6. Useful for passing info to ansible host files
7. Useful to start automation scripts after infrastructur provisioning

# Remote States

1. Terraform keeps the remote state of the infrastructure
2. store it in a file called `terraform.tfstate`
3. a backup of the previous state is also kept at `terraform.tfstate.backup`
4. whe we do terraform apply and new state file and backup file is created
5. this is how terraform keeps track of remote state
6. If remote state changes and you hit terraform apply again , changes will be made to match the correct state
7. WE can keep the `terraform.tfstate` in version control (eg: GIT)
8. Local state store works well for small project, remote store is required for bigger projects
9. Remote store in terraform using the backend functionality
10. default backend is local, others inculde s3(with locking via dynamoDB), consul, terraform enterprise

11. Two steps in configuring remote state,
    a. add backend code to a .tf file
    b. Run the initialisation process

12. Using remote state will ensure the latest state.
13. Remote state avoids need to push `.tfstate` file to git
14. We can specify a readonly remote store directly in a remote file.(Kind of something called `Datasource`)

#### terraform with s3 backend

```
$ aws configure
# enter access key, secret and region

# backend.tf
terraform {
  backend "s3" {
    bucket = "terraform-state-f2nalk"
    key = "terraform/demo4"
  }
}
```

# Datasources

1. For certain providers like aws, terraform provides datasource.
2. Datasources provide with dynamic info
3. lot of info available via aws api the same is exposed via terraform using datasources
4. eg: list of amis, list of availability zones
5. Datasource give all ip address used by AWS, this is great for filtering traffic based on AWS region.
6. Filtering traffic in aws can be done by security groups.
7. inboud and outbound requests can be filtered based on ip, ip-range, protocol, port
8. The above is similar to iptables in linux

```
the following adds a security group which accepts traffic form ec2 instances of a particular region

# provider.tf
provider "aws" {
    region = "${var.AWS_REGION}"
}

# vards.tf
variable "AWS_REGION" {
  default = "eu-west-1"
}
variable "AMIS" {
  type = "map"
  default = {
    us-east-1 = "ami-13be557e"
    us-west-2 = "ami-06b94666"
    eu-west-1 = "ami-844e0bf7"
  }
}

# securitygroup.tf
data "aws_ip_ranges" "european_ec2" {
  regions = [ "eu-west-1", "eu-central-1" ]
  services = [ "ec2" ]
}

resource "aws_security_group" "from_europe" {
 name = "from_europe"

  ingress {
    from_port = "443"
    to_port = "443"
    protocol = "tcp"
    cidr_blocks = [ "${data.aws_ip_ranges.european_ec2.cidr_blocks}" ]
  }
  tags {
    CreateDate = "${data.aws_ip_ranges.european_ec2.create_date}"
    SyncToken = "${data.aws_ip_ranges.european_ec2.sync_token}"
  }

}
```

# Templates

#### Template provider

1. can help in creating customised configuration file
2. can build templates based on variables from terraform resources (from public ip).
3. The resultant string can be used as variable in terraform
4. the string contains a template, eg: a config file
5. In AWS you can pass commands that are run when instance runs first
6. In AWS this is called `user-data`
7. if you want to pass user-data that depends on other information in terraform eg: ip address we can use provider template

# Modules

1. Use Modules to make terraform more organised
2. Use third party modules like modules from github, reuse parts of you code eg, setup vpc in aws

```
module "module-example" {
  source = "github.com/ajdflk/akdh"
}
or
module "module-example" {
  source = "./module-example"
}
```

3. Pass args to module

```
module "module-example" {
  source = "./module-example"
  region = ""
  ip-range = ""
  cluster-size = "3"
}
```

4. inside modules we have terraform files (.tf)

```
$ ssh-keygen mykey
# mykey, mykey.pub

# key.tf
resource "aws_key_pair" "mykey" {
  key_name = "mykey"
  public_key = "${file("${var.PATH_TO_PUBLIC_KEY}")}"
}

# vars.tf
variable "AWS_REGION" {
  default = "eu-west-1"
}
variable "PATH_TO_PRIVATE_KEY" {
  default = "mykey"
}
variable "PATH_TO_PUBLIC_KEY" {
  default = "mykey.pub"
}

# provider.tf
provider "aws" {
    region = "${var.AWS_REGION}"
}


# module.tf
module "consul" {
  source = "github.com/wardviaene/terraform-consul-module.git"
  key_name = "${aws_key_pair.mykey.key_name}"
  key_path = "${var.PATH_TO_PRIVATE_KEY}"
}
output "consul-output" {
  value = "${module.consul.server_address}"
}

$ terraform get # to connect to remote git repo
# the above will be downloaded at /.terraform/modules
$ terraform apply # to apply the downloaded module
```

#### terraform commands overview

`terraform apply`, Applies the state

`destroy`, Destroys all terraform managed states
`fmt`, rewrite terraform config files to a canonical format and style

`get`, Download modules

`graph`, creates a graphical representation of configuration or execution plan

`import [option] ADDRESS id`, tries to find the infrastructure associated with the id and puts it to a .tfstate with resource id (useful incase you want to include an already created resource into the .tfstate)

`output [options] NAME`, Outputs any of the resources, Using NAME will output only the mentioned resource

`plan`, show the changes that will be made to the infrastructure

`push`, to push to terraform enterprise

`refresh`, Refresh the remote state, Can identify diff between state and remote state

`remote`, configure remote state storage

`show`, shows human readable output from a state or a plan

`state`, use this for advanced state management, like renaming a resource with `terrafrom state mv ws_instance.example aws_instance.prod`

`taint`, manually mark a resource as tainted, it will be destroyed and recreated in the next apply

`vaildate`, validates the terraform syntax

`untaint`, undo a taint
