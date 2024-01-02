+++
title = 'Booting with Pxe'
date =  '2024-01-02T08:59:57-07:00'
showAuthor = false # Default author
authors = [''] # Authors other than default
description = ''
draft = false
+++

> This was a port of an old article from my gitbook.com page.  The information within may be out of date.

## Overview

**Goal**: Enable PXE booting on the home network for both BIOS and UEFI machines.

{{< alert icon="circle-info" iconColor="#FFFFFF" >}}
The following tools will be used:
* Ubiquiti EdgeRouter X w/ dnsmasq for DNS & DHCP
* Synology will host the TFTP server and images
* Hyper-V / Parallels will be used for testing
{{< /alert >}}

For starters we need on bootable image, I have opted to use [netboot](https://www.netboot.xyz) for image sources.
A suitable alternative would be pxelinux.

## Setting Up the TFTP Server

Before we can tell the machines to boot anything we need to configure the TFTP server.  As mentioned this will reside on our Synology. -> https://synology.home.local

### Enabling TFTP and Setting Up the Root Folder

{{< alert icon="check" cardColor="#3C5233" iconColor="#FFFFFF" >}}
Make sure that you have a shared folder that is accessible.  For my testing I just created a share called PXE and gave *guest* read-only access.
{{< /alert >}}

* Login to the web UI
* Click on Control Panel
* Click on File Services
* Select the TFTP tab
    * check the box next to "Enable TFTP service"
    * Be sure to set the root of your TFTP server below this box
    * (Optional) Under advanced settings you can enable file transfer logs
    * Click Apply
* Using your system's file browser navigate to the network share (e.g. `\\synology.home.local\PXE`)

{{< alert icon="circle-info" iconColor="#FFFFFF" >}}
This folder should be empty for now
{{< /alert >}}

### Adding an Image or Three

I found it easist to start with using a Gen 1 machien in Hyper-V or even easier to use Parallels and build a legacy (BIOS) machine.  And in order to have an image that will boot with BIOS, from the [downloads](https://www.netboot.xyz/downloads/) page,
you can choose either:

* [DHCP](https://www.netboot.xyz/)
* [DHCP-undionly](https://boot.netboot.xyz/ipxe/netboot.xyz-undionly.kpxe)

To keep things organized create a folder named bin in the root of your shared drive and copy one or both of these files to the newly created bin/folder.

### Testing the TFTP Server

The easist way I have found to test is from either WSL or a *nix-based OS, install **tftp** which is a client.
Then you can use the following commands: `tftp` & `get` to verify that you can download the images via TFTP.  The output should look like so:

```
user@localhost:~$ tftp <Your Synology IP>
tftp> get bin/<image-name>
Recieved 91646 bytes in 0.1 seconds
tftp>quit
```

Congratulations! If you see the #### bytes  received, you can successfuly download a bootable image via TFTP.

## Configured DHCP options for PXE

{{< alert icon="triangle-exclamation" iconColor="#FFFFFF" cardColor="#CC6742" >}}
In my homelab I am running an EdgeRouter X (ER-X) and instead of using the default ISC DHCP daemon, I am using dnsmasq.
As such when configuring the *dhcp-server* options certain values will be ignored (namely global-parameters & subnet-parameters) and instead dnsmasq configurations will have to be made under the ***dns-forwarding*** within the "options" sections.
{{< /alert >}}

<br/>

{{< alert icon="circle-info" iconColor="#FFFFFF" >}}
Resources that were helpful in figuring out how to ork with dnsmasq and ER-X.
* [EdgeRouter - DHCP Server Using Dnsmasq](https://help.ubnt.com/hc/en-us/articles/115002673188-EdgeRouter-DHCP-Server-Using-Dnsmasq)
* [Eample dnsmasq config](https://cs.uwaterloo.ca/twiki/pub/CF/DNSMASQ-MULTIARCH/dnsmasq.conf)
{{< /alert >}}