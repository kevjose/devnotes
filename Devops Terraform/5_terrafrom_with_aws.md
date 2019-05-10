# Terraform with AWS

#### VPCs

stands for Virtual Private Network

1. On AWS we have a default VPC to launch instances in
2. VPC isolates instances on a network level
3. It's like own private network on the cloud
4. Best practice to launch instance in default VPC or the once created and managed by terraform
5. Communication via private IP only possible within same VPC
6. Linking two VPCs for communication is called `peering`
7. On AWS we have to create VPC to launch instances in, this VPC uses the 10.0.X.X address space (eu-west-1)
8. Amazon calls one data center as an availability zone
9. Every availability has a public and a private subnet
10. All public subnets are connected to an internet gateway, these instances will also have a public ip, allowing them to be reachable by the internet
11. public subnet for internet facing services or application, private subnet for Databases, caching, backend, if using a Load Balancer, put the LB in a public subnet and instance serving the application in the private subnet
