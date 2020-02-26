# Intro to containers

- to the core containers are few features of linux kernel duct taped together to acheive isolation.

## Need for containers

### Bare metals

- to run a web server or a service, had to own or rent out physical server
- no abstraction, tedious to set up and running

### Virtual Machines

- first efforts of abstraction, instead of having a linux running, have multiple instances on you physical machine.
- Compare running two websites on bare metals (all process visible to root user) vs virtual machines (complete isolation)

### Public cloud

- vm on cloud.
- still have to run an entire OS inside the host OS.

### Containers

- uses essential feature of the os (chroot, namespace, cgroup)

## Making you own container

- using chroot, namespace, cgroup

- chroot, sets the root directory of a new process.

```bash
$: docker run -it --name docker-host --rm --privileged ubuntu:bionic
```

- the above downloads official ubuntu container, `docker run` will start commands in the downloaded container, `-it` short for `--interactive --tty` interactive shell.

- once in the container

```bash
$: mkdir /my-new-root
$: echo "my super secret thing" >> /my-new-root/secret.txt
$: chroot /my-new-root bash
# above gives an error bash is not found
```

- fixing bash

```bash
$: mkdir /my-new-root/bin
$: cp /bin/bash /bin/ls /my-new-root/bin/
$: chroot /my-new-root bash
```

- fixing loading dynamic libraries
- run the below to find the dynamic dependancies

```bash
ldd /bin/bash
# output
# linux-vdso.so.1 (0x00007fffa89d8000)
# libtinfo.so.5 => /lib/x86_64-linux-gnu/libtinfo.so.5 (0x00007f6fb8a07000)
# libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f6fb8803000)
# libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f6fb8412000)
# /lib64/ld-linux-x86-64.so.2 (0x00007f6fb8f4b000)
```

- copy the dynamic libs to the new root

```bash
$: mkdir /my-new-root/lib /my-new-root/lib64
$: cp /lib/x86_64-linux-gnu/libtinfo.so.5 /lib/x86_64-linux-gnu/libdl.so.2 /lib/x86_64-linux-gnu/libc.so.6 /my-new-root/lib
$: cp /lib64/ld-linux-x86-64.so.2 /my-new-root/lib64
$: cp /lib/x86_64-linux-gnu/libselinux.so.1 /lib/x86_64-linux-gnu/libpcre.so.3 /lib/x86_64-linux-gnu/libpthread.so.0 /my-new-root/lib

# finally !!
$: chroot /my-new-root bash
```

- Namespaces for security
- to prove the need for namespaces, open new terminal

```bash
$: docker exec -it docker-host bash
$: tail -f /my-new-root/secret.txt & # runs in background
# copy process id from here and kill it from terminal 1
$ kill <PID of tail>
```

- using the `unshare` command

```bash
$: exit # from our chroot'd environment if you're still running it, if not skip this

# install debootstrap
$: apt-get update -y
$: apt-get install debootstrap -y
$: debootstrap --variant=minbase bionic /better-root

# head into the new namespace'd, chroot'd environment
$: unshare --mount --uts --ipc --net --pid --fork --user --map-root-user chroot /better-root bash # this also chroot's for us
$: mount -t proc none /proc # process namespace
$: mount -t sysfs none /sys # filesystem
$: mount -t tmpfs none /tmp # filesystem
```

- Run tail -f /my-new-root/secret.txt & from #2 (not the unshare env)
- Run ps from #1, grab pid for tail
- Run kill <pid for tail>, see that it doesn't work

* Cgroups for resource distribution

```bash
# outside of unshare'd environment get the tools we'll need here
$: apt-get install -y cgroup-tools htop

# create new cgroups
$: cgcreate -g cpu,memory,blkio,devices,freezer:/sandbox

# add our unshare'd env to our cgroup
$: ps aux # grab the bash PID that's right after the unshare one
$: cgclassify -g cpu,memory,blkio,devices,freezer:sandbox <PID>

# list tasks associated to the sandbox cpu group, we should see the above PID
$: cat /sys/fs/cgroup/cpu/sandbox/tasks

# show the cpu share of the sandbox cpu group, this is the number that determines priority between competing resources, higher is is higher priority
$: cat /sys/fs/cgroup/cpu/sandbox/cpu.shares

# kill all of sandbox's processes if you need it
# kill -9 $(cat /sys/fs/cgroup/cpu/sandbox/tasks)

# Limit usage at 5% for a multi core system
$: cgset -r cpu.cfs_period_us=100000 -r cpu.cfs_quota_us=$[ 5000 * $(getconf _NPROCESSORS_ONLN) ] sandbox

# Set a limit of 80M
$: cgset -r memory.limit_in_bytes=80M sandbox
# Get memory stats used by the cgroup
$: cgget -r memory.stat sandbox

# in terminal session #2, outside of the unshare'd env
$: htop # will allow us to see resources being used with a nice visualizer

# in terminal session #1, inside unshared'd env
$: yes > /dev/null # this will instantly consume one core's worth of CPU power
# notice it's only taking 5% of the CPU, like we set
# if you want, run the docker exec from above to get a third session to see the above command take 100% of the available resources
# CTRL+C stops the above any time

# in terminal session #1, inside unshare'd env
$: yes | tr \\n x | head -c 1048576000 | grep n # this will ramp up to consume ~1GB of RAM
# notice in htop it'll keep the memory closer to 80MB due to our cgroup
# as above, connect with a third terminal to see it work outside of a cgroup
```

## Docker images

- these are pre-made containers. These comprise of the state of the container

```bash
# start docker contanier with docker running in it connected to host docker daemon
docker run -ti -v /var/run/docker.sock:/var/run/docker.sock --privileged --rm --name docker-host docker:18.06.1-ce

# run stock alpine container
docker run --rm -dit --name my-alpine alpine:3.10 sh

# export running container's file system
docker export -o dockercontainer.tar my-alpine

# make container-root directory, export contents of container into it
mkdir container-root
tar xf dockercontainer.tar -C container-root/

# make a contained user, mount in name spaces
unshare --mount --uts --ipc --net --pid --fork --user --map-root-user chroot $PWD/container-root ash # this also does chroot for us
mount -t proc none /proc
mount -t sysfs none /sys
mount -t tmpfs none /tmp

# here's where you'd do all the cgroup rules making with the settings you wanted to
```

- docker commands

```bash
$: docker run --interactive --tty alpine:3.10 # or, to be shorter: docker run -it alpine:3.10
$: docker run alpine:3.10 ls
$: docker run ubuntu:bionic ls
$: docker run --detach -it ubuntu:bionic # or, to be shorter: docker run -dit ubuntu:bionic
$: docker ps
$: docker attach <ID or name>
$: docker kill <IDs or names of containers>
$: docker kill $(docker ps -q) # -q returns  the ids


$: docker run -dit --name my-ubuntu ubuntu:bionic
$: docker kill my-ubuntu

```

- you can refer to these by a name you set. But now if you tried it again, it'd say that my-ubuntu exists. If you run docker ps --all you'll see that the container exists even if it's been stopped. That's because Docker keeps this metadata around until you tell it to stop doing that. You can run docker rm my-ubuntu which will free up that name or you can run docker container prune to free up all existing stopped containers (and free up some disk space.)

```bash
$: docker run --rm -dit --name my-ubuntu ubuntu:bionic
$: docker kill my-ubuntu
```

## Node.js on docker

```bash
$: docker run -it node:12-stretch


$: docker run node:12-stretch cat /etc/issu # last is the commad to tbe executed on start
```

- More docker commands

```bash
docker pull jturpin/hollywood
docker run -it jturpin/hollywood hollywood
docker inspect node
docker run -dit jturpin/hollywood hollywood
docker ps # see container running
docker pause <ID or name>
docker ps # see container paused
docker unpause <ID or name>
docker ps # see container running again
docker kill <ID or name> # see container is gone



docker run -dit jturpin/hollywood hollywood
docker ps # grab the name or ID
docker exec <ID or name> ps aux # see it output all the running processes of the container


docker run mongo
docker top <ID outputted by previous command> # you should see MongoDB running


docker run -d mongo
docker logs <id from previous command> # see all the logs



docker ps --all
docker rm <id or name>
docker rmi mongo

```

## Dockerfiles

```Dockerfile
FROM node:12-stretch

CMD ["node", "-e", "console.log(\"hi lol\")"]

```

```bash
docker build .
docker run <ID>
# alt
docker build . --tag my-node-app ## or -t instead of --tag
docker run my-node-app
```

## Build a nodejs app

```javascript
// index.js
const http = require('http');

http
  .createServer(function(request, response) {
    console.log('request received');
    response.end('omg hi', 'utf-8');
  })
  .listen(3000);
console.log('server started');
```

```Dockerfile
FROM node:12-stretch

COPY index.js index.js

CMD ["node", "index.js"]
```
