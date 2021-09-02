---
layout: post
title: LXC Containers On Local Network
date:   2021-08-31 16:35:27 +0530
categories: Programming
---
LXC are a great way of creating linux containers that are lightweight and can be used to sandbox applications you run inside it. Quite often it is required that your application needs to interact with other devices on the network. By default, lxc-usernet service is configured to assign an IP address to your LXC containers, using the device lxc-br0. To change this behaviour, we need to configure lxc to use our own bridge. Let's see how we need to do that:

##### Important Notes
- Please note that this article assumes that you are trying to bridge a wired interface, it takes lot more (and different) configuration to make it possible (if it is) to bridge a wireless (WiFi) interface.

##### Step 0: Installing prerequisites

```bash
ajinkya@metaverse:~$ sudo apt-get install ifupdown bridge-utils
```

##### Step 1: Configuring your own bridge

To know what interface we are going to bridge, you can run `ip a show` to see all available interfaces.

```bash
ajinkya@metaverse:~$ ip a show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
    valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 52:54:00:8c:62:44 brd ff:ff:ff:ff:ff:ff
    inet 192.168.121.241/24 brd 192.168.121.255 scope global dynamic eth0
    valid_lft 2900sec preferred_lft 2900sec
    inet6 fe80::5054:ff:fe8c:6244/64 scope link 
    valid_lft forever preferred_lft forever
```

In my case, the interface is `enp0s3` instead of `eth0`, so I will be using that. Open `/etc/network/interfaces` in the text editor of your choice, and edit it so that contents of the file look like this:

```bash
ajinkya@metaverse:~$ cat /etc/network/interfaces
auto br0
iface br0 inet dhcp
    bridge-ifaces enp0s3
    bridge-ports enp0s3
    up ifconfig enp0s3 up
iface eth0 inet manual
```

What we're doing here is two things: adding our own bridge `br0` and setting the `eth0` interface to be configured manually. Now, to make these changes take effect, run the `ifup` command:

```bash
ajinkya@metaverse:~$ sudo ifup br0
```

At this point we have created and activated a bridge to our local network, but we haven't configured LXC to use this bridge yet. Assuming you already have LXC installed on your machine, we proceed with the LXC configuration.

##### Step 3: Configuring LXC to use our bridge

We can configure this by either editing the `~/.config/lxc/default.conf` or the `/etc/lxc/default.conf`. I wanted this configuration as a default configuration so I edited the later to look like this:

```bash
ajinkya@metaverse:~$ cat etc/lxc/default.conf
lxc.net.0.type = veth
lxc.net.0.link = br0
lxc.net.0.flags = up
lxc.net.0.hwaddr = 00:16:3e:xx:xx:xx

ajinkya@metaverse:~$ cat .config/lxc/default.conf
lxc.include = /etc/lxc/default.conf
# for unprivileged containers #output of sudo grep ajinkya /etc/sub{uid,gid} 
lxc.idmap = u 0 100000 65536
lxc.idmap = g 0 100000 65536
```

##### Step 4: Verify the results:

Creating a lxc container, and verifying the assigned IP address:

```bash
ajinkya@metaverse:~$ lxc-create -t download -n mycontainer -- -d ubuntu -r xenial -a amd64 --keyserver hkp://keyserver.ubuntu.com
Using image from local cache
Unpacking the rootfs

---
You just created an Ubuntu xenial amd64 (20210830_07:42) container.
ajinkya@metaverse:~$ lxc-start -n con2
ajinkya@metaverse:~$ lxc-ls --fancy
NAME         STATE     AUTOSTART    GROUPS  IPV4            UNPRIVILEGED
mycontainer  RUNNING   0            -       192.168.1.155   true
```

Refereneces:
- [Converting eth0 to br0](https://ubuntu.com/blog/converting-eth0-to-br0-and-getting-all-your-lxc-or-lxd-onto-your-lan)
- [Discussion at linuxcontainers.org](https://discuss.linuxcontainers.org/t/lxc-container-on-same-network-as-host-with-internet-access/12038)