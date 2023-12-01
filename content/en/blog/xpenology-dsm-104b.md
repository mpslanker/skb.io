---
title: "Xpenology DSM 6.1.x on VMware ESXi 7"
date: 2021-03-07T21:50:36-06:00
author: The Masked Farter (@farter_masked)
draft: false
---

## Goals

To build a virtual DSM machine starting with just the synoboot.img.

## VMware Steps

Steps to create a VM with the hardware necessary to boot Jun's synoboot image

1. Create new VM
2. Configure similar to table below
    1. Important settings are the Guest OS name, NIC type, NIC MAC address, Hard disk 1 capacity, Hard disk 1 device node
3. Add any additional hard disks, attached to the second SATA controller starting at position 1:0
4. In the VM's CD/DVD drive, mount a Linux Live ISO (I used [Fedora 33 Workstation](https://getfedora.org/en/workstation/download/)). All you really need is something that has `dd` and a browser.
5. Boot VM, booting into the Linux OS.

## VM - Linux Steps

Steps to write the synoboot.img to your VM's VMDK

6. Once Linux is booted, use it's browser to download [synoboot.img](https://xpenology.com/forum/topic/12952-dsm-62-loader/)
7. Write synoboot.img to the 50MB disk
    ```bash
    # use sudo fdisk -l to identify the 50MB disk for the following command
    sudo dd if=synoboot.img of=/dev/sda
    ```
8. Restart the VM
9. Disconnect Linux Live ISO; you want to make sure you're booting from the 50MB disk now.
10. If you're successfully booting from the 50MB disk, then grub should load and present you with 3 boot options: choose the ESXi option (this menu will disappear quickly)
11. Once the VM is on the `Happy hacking` screen, from your main computer (on the same network as the VM) run [Synology Assistant](https://www.synology.com/en-us/support/download/DS918+#utilities) and search for devices (I had better luck running this on Windows vs macOS. If Windows doesn't automatically ask to allow the Synology Assistant through the firewall, then you might need to manually allow it or disable the Windows Firewall)

## DSM Install

12. If your vDSM is found, the Synology Assistant should pop up the EULA agreement (if it doesn't pop up you can select the discovered device and click `Connect`). Once you've agreed, your browser should open to the Set up screen to install/setup DSM.
13. Click `Set up`
14. Click `Manual Install`
15. Click `Browse` and select the [.pat file downloaded from Synology](https://archive.synology.com/download/Os/DSM) (Download a base release \[without a -number at the end\]. I used `DSM_DS918+_23739.pat` but have since upgraded to DSM 6.2.3-25426)
16. Click `Install Now`
17. Acknowledge that all data will be erased from the existing disks
18. The DSM install will proceed
19. After install completes a reboot counter will show. You can monitor the VM console to see once the VM has rebooted and is back on the `Happy hacking` screen. Then you should be able to load the DSM web console at `https://<IP address>:5000` (IP address is shown in the Synology Assistant) and continue the DSM setup
20. Complete the administrator account setup screen: assigning the hostname, and creating the administrator user
21. Complete the DSM Update and Maintenance setup screen: Choose the option to be notified about updates, avoid automatic updates
22. On the Set up QuickConnect screen, click the link at the bottom of the page to `Skip this step`
23. On the final setup screen, leave the option to share your location with Synology unchecked
24. DSM should load normally

## DSM Setup

25. Open Storage Manager and create a volume, the details of which are up to you. This step is required before you'll be able to install any packages.
26. [Download the latest open-vm-tools](https://github.com/leonardw/synology-open-vm-tools/releases/) for your selected model/architecture. For the DS918+ I used the [latest apollolake tools](https://github.com/leonardw/synology-open-vm-tools/releases/download/release-11.0.1-1/open-vm-tools_apollolake-6.1_11.0.1-1.spk).
27. Open Package Center, click `Manual Install`
28. Click `Browse` and find the `open-vm-tools_*.spk` file you downloaded above, and complete the package install.

## VM Configuration Table

| Setting                         | Value                                                    |
|---------------------------------|----------------------------------------------------------|
| Guest OS name                   | Other 3.x Linux (64-bit)                                 |
| Virtualization Based Security   | Disabled                                                 |
| CPUs                            | 2                                                        |
| Memory                          | 8 GB                                                     |
| NIC 1 type	                  | E1000E                                                   |
| NIC 1 MAC address               | 00:11:32:12:34:56 - This must match the value present inside the synoboot.img's grub.cfg. The value provided here matches the value as of the 1.04b release |
| **SATA Controller 0**           |                                                          |
| Hard disk 1 Capacity	          | 50 MB - This is the size of the synoboot.img which we'll be writing to this disk |
| Hard disk 1 Virtual device node | SATA(0:0) - This is the boot disk so we want it as the first disk |
| Hard disk 1 Mode                | Dependent                                                |
| **SATA Controller 1**           | **Attach any additional disks here**                     |
| Hard disk 2 Capacity            | 40 GB                                                    |
| Hard disk 2 Virtual device node | SATA(1:0)                                                |
| Hard disk 2 Mode                | Dependent                                                |
| **IDE Controller 0**            |                                                          |
| CD/DVD Drive 1 Status           | [X] Connect At Power On                                  |
| CD/DVD Drive 1 CD/DVD Media     | ISO file - iso/Fedora-Workstation-Live-x86_64-33-1.2.iso |