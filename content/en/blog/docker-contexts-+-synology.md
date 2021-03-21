---
title: "Docker Contexts & Synology"
date: 2021-03-07T12:26:54-07:00
author: Matthew P. Slanker (@mpslanker)
draft: false
---

## Overview
### Goal
To be able to use `docker context` on my local machine to issue commands against the Docker instance on my Synology NAS.

### Assumptions
Unless specifically requested I won't be covering the following here:
* Docker is installed on your Synology
* You have enabled SSH on your Synology
* You have docker installed on your client machine
* You already have an SSH key that you want to use

### High-level Steps
Here is a quick checklist of things that needs to be done.

- [ ] Copy SSH key from client machine to Synology
- [ ] Fix permissions on your user directory
- [ ] Configure Synology's SSH daemon
- [ ] Reload the daemon
- [ ] Verify you can log in with keys instead of password
- [ ] Verify docker version on Synology is 18.09 or later
- [ ] Create docker group
- [ ] Change permissions on docker socket
- [ ] Verify docker commands can be run locally without sudo
- [ ] Create docker context
- [ ] Change context and test
- [ ] Profit!

## Walkthrough

### Enabling SSH access using keys
By default it seems that Synology is not setup to allow authentication using SSH keys.  So this is our first order of business.
#### Copy SSH key from client machine to Synology
Let's start by getting an suitable SSH key into the .authorized_keys file on the Synology. Make sure that you replace ***\<YOUR-SYNOLOGY-HOSTNAME-HERE>*** with your Synology's hostname or fqdn.

``` bash {linenos=table}
# Configuring SSH keys for synology login
# On client machine

# Add ssh-key to synology
ssh-copy-id $(id -un)@<YOUR-SYNOLOGY-HOSTNAME-HERE>

# You will likely be prompted for a password at this point
```


#### Create an 'environment' file in the .ssh folder
As we will see in a later step we need to be able to set the users environment in a non-interactive session.  Therefore we need to create a file name "environment", add a line which configures the path, and mark it executable.

``` bash {linenos=table}
# Create the 'environment' file in ~/.ssh
cd ~/.ssh
# Write our current PATH to the environement file
echo PATH=$PATH >> ./environment
chmod +x ./environment
```


#### Fix permissions on your user directory
``` bash {linenos=table}
# Fix permissions on user directory
# On Synology

sudo chmod 755 ~
sudo chmod 755 -R ~/.ssh
```

#### Configure Synology's SSH daemon
You should still be logged into your Synology from performing the previous steps.  At this point we need to edit the SSH daemon's config file. (It is assumed you are familiar with editing using vi but feel free to use any editor your are comfortable with.)

The file we need to edit is `/etc/ssh/sshd_config` and you will need **sudo** or **root** access to edit this file.

Edit the file using: `sudo vi /etc/ssh/sshd_config`

{{< alert >}}
Below is a copy of my sshd_config file, however, it is possible yours may be different.  Please do not just copy & paste this.  Please take care to understand what these options are doing.  I have highlighted the values in particular and explain each of them in turn.

It is also advised you back up this file before altering it.
A simple `sudo cp /etc/ssh/sshd_config ~/sshd_config.bak` should suffice.
{{< /alert >}}

* Lines 14 & 17: Hostkey values for RSA and ED25519 algorithms
* Lines 39 & 40: Enable RSA & public key authentication modes
* Line 101: Permits our users to override their environments.
*(This is necessary for some Docker functionality and is covered later in this post)*

``` bash {linenos=table,hl_lines=[14,17,39,40,101]}
Ciphers aes128-ctr,aes128-gcm@openssh.com,aes192-ctr,aes256-ctr,aes256-gcm@openssh.com,chacha20-poly1305@openssh.com
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org,diffie-hellman-group-exchange-sha256,diffie-hellman-group14-sha1,diffie-hellman-group14-sha256,diffie-hellman-group16-sha512,diffie-hellman-group18-sha512,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521
MACs hmac-sha1,hmac-sha1-etm@openssh.com,hmac-sha2-256,hmac-sha2-256-etm@openssh.com,hmac-sha2-512,hmac-sha2-512-etm@openssh.com,umac-128-etm@openssh.com,umac-128@openssh.com,umac-64-etm@openssh.com,umac-64@openssh.com
#	$OpenBSD: sshd_config,v 1.94 2015/02/02 01:57:44 deraadt Exp $ # This is the sshd server system-wide configuration file.  See # sshd_config(5) for more information.  # This sshd was compiled with PATH=/usr/bin:/bin:/usr/sbin:/sbin # The strategy used for options in the default sshd_config shipped with # OpenSSH is to specify options with their default value where # possible, but leave them commented.  Uncommented options override the # default value.  #Port 22 #AddressFamily any
#ListenAddress 0.0.0.0
#ListenAddress ::

# The default requires explicit activation of protocol 1
#Protocol 2

# HostKey for protocol version 1
#HostKey /etc/ssh/ssh_host_key
# HostKeys for protocol version 2
HostKey /etc/ssh/ssh_host_rsa_key
#HostKey /etc/ssh/ssh_host_dsa_key
#HostKey /etc/ssh/ssh_host_ecdsa_key
HostKey /etc/ssh/ssh_host_ed25519_key

# Lifetime and size of ephemeral version 1 server key
#KeyRegenerationInterval 1h
#ServerKeyBits 1024

# Ciphers and keying
#RekeyLimit default none

# Logging
# obsoletes QuietMode and FascistLogging
#SyslogFacility AUTH
#LogLevel INFO

# Authentication:

#LoginGraceTime 2m
#PermitRootLogin yes
#StrictModes yes
#MaxAuthTries 6
#MaxSessions 10

RSAAuthentication yes
PubkeyAuthentication yes

# The default is to check both .ssh/authorized_keys and .ssh/authorized_keys2
# but this is overridden so installations will only check .ssh/authorized_keys
#AuthorizedKeysFile	.ssh/authorized_keys

#AuthorizedPrincipalsFile none

#AuthorizedKeysCommand none
#AuthorizedKeysCommandUser nobody

# For this to work you will also need host keys in /etc/ssh/ssh_known_hosts
#RhostsRSAAuthentication no
# similar for protocol version 2
#HostbasedAuthentication no
# Change to yes if you don't trust ~/.ssh/known_hosts for
# RhostsRSAAuthentication and HostbasedAuthentication
#IgnoreUserKnownHosts no
# Don't read the user's ~/.rhosts and ~/.shosts files
#IgnoreRhosts yes

# To disable tunneled clear text passwords, change to no here!
PasswordAuthentication yes
#PermitEmptyPasswords no

# Change to no to disable s/key passwords
ChallengeResponseAuthentication no

# Kerberos options
#KerberosAuthentication no
#KerberosOrLocalPasswd yes
#KerberosTicketCleanup yes
#KerberosGetAFSToken no

# GSSAPI options
#GSSAPIAuthentication no
#GSSAPICleanupCredentials yes

# Set this to 'yes' to enable PAM authentication, account processing,
# and session processing. If this is enabled, PAM authentication will
# be allowed through the ChallengeResponseAuthentication and
# PasswordAuthentication.  Depending on your PAM configuration,
# PAM authentication via ChallengeResponseAuthentication may bypass
# the setting of "PermitRootLogin without-password".
# If you just want the PAM account and session checks to run without
# PAM authentication, then enable this but set PasswordAuthentication
# and ChallengeResponseAuthentication to 'no'.
UsePAM yes

#AllowAgentForwarding yes
#AllowTcpForwarding no
#GatewayPorts no
#X11Forwarding no
#X11DisplayOffset 10
#X11UseLocalhost yes
#PermitTTY yes
#PrintMotd yes
#PrintLastLog yes
#TCPKeepAlive yes
#UseLogin no
UsePrivilegeSeparation sandbox		# Default for new installations.
PermitUserEnvironment yes
#Compression delayed
#ClientAliveInterval 0
#ClientAliveCountMax 3
#UseDNS no
#PidFile /var/run/sshd.pid
#MaxStartups 10:30:100
#PermitTunnel no
ChrootDirectory none
#VersionAddendum none

# no default banner path
#Banner none

# override default of no subsystems
#Subsystem	sftp	/usr/libexec/sftp-server
Subsystem       sftp    internal-sftp -f DAEMON -u 000

# the following are HPN related configuration options
# tcp receive buffer polling. disable in non autotuning kernels
#TcpRcvBufPoll yes

# disable hpn performance boosts
#HPNDisabled no

# buffer size for hpn to non-hpn connections
#HPNBufferSize 2048


# allow the use of the none cipher
#NoneEnabled no

# Example of overriding settings on a per-user basis
#Match User anoncvs
#	X11Forwarding no
#	AllowTcpForwarding no
#	PermitTTY no
#	ForceCommand cvs server
Match User root
	AllowTcpForwarding yes
Match User admin
	AllowTcpForwarding yes
Match User anonymous
	AllowTcpForwarding no
	GatewayPorts no

```
Make the changes as necessary, save, exit the file.

#### Reload the SSH daemon
{{< alert >}} We need to validate the config before reloading or we might get locked out.  If this happens you also have the option to turn on Telnet via the web GUI but let's try to avoid that. {{< /alert>}}

Next we can validate the config and resload it.
``` bash {linenos=table}
# Validate (As long as there are no errors we are good.)
# Deprecations can be ignored for now
sudo sshd -t

# Reload
sudo synoservicectl --reload sshd
```

#### Verify you can log in with keys instead of password
Congratulations! You should now be able to log into your Synology without getting prompted for a password.  Next up, configuring Docker.

### Configuring the Docker daemon
There are a few ways to accomplish setting up the Docker daemon for remote access.  However, for our purposes we are going to use SSH to drastically simplify the setup as it doesn't require us to generate certs or change anything about the socket. If you would like to learn more about the different options I highly recommend this Elton's [Docker Nuggets video](https://www.youtube.com/watch?v=YX2BSioWyhI) on Remote Control with Docker Context.

#### Verify docker version on Synology is 18.09 or later
The only prerequisite for this on the Synology side is to make sure that the installed Docker version is 18.09 or later.  You can check this by logging into your Synology via SSH and running the following command:
`sudo docker version`

Your output should look like something like this (note the highlight line):
``` bash {linenos=table,hl_lines=[13]}
you@your-synology:~$ sudo docker version
Client:
 Version:           18.09.8
 API version:       1.39
 Go version:        go1.11
 Git commit:        bfed4f5
 Built:             Fri Mar 13 06:46:11 2020
 OS/Arch:           linux/amd64
 Experimental:      false

Server:
 Engine:
  Version:          18.09.8
  API version:      1.39 (minimum version 1.12)
  Go version:       go1.11
  Git commit:       3a371f3
  Built:            Fri Mar 13 06:44:35 2020
  OS/Arch:          linux/amd64
  Experimental:     false
```

#### Create docker group
Assuming we're good here the next thing we want to do is remove the need to use `sudo` everytime we want to run a docker command.  We start by creating a group which we can grant this access.

``` bash {linenos=table}
# Create a group named 'docker`
# and add your logged in user
sudo synogroup --add docker $(id -un)
```

{{< alert >}}
Please make sure to protect access to this group.  It gives people the ability to run containers and mount local disks, so don't just grant anyone and everyone access.
{{< /alert >}}

#### Change permissions on docker socket
And finally we need to change the permissions on the socket. By default Synology sets the permissions to **srw-rw---- 1 root root** but we will be changing this to **root docker**

``` bash {linenos=table}
# (Optional) View current permissions
ls -al /var/run/docker.sock

# Grant the docker group access to the socket
sudo chown root:docker /var/run/docker.sock
```

#### Verify docker commands can be run locally without sudo
If everything has gone as it should you should be able to logout, log back in, and run `docker ps` sans `sudo` and get results (instead of an error message).  If you have made it this far continue on the last piece of the puzzle.

Example output:

``` bash {linenos=table}
you@your-synology:~$ docker version
CONTAINER ID IMAGE                COMMAND    CREATED     STATUS               PORTS NAMES
b4edeec64cd2 pihole/pihole:latest "/s6-init" 2 weeks ago Up 2 weeks (healthy)       pi-hole
```

Now let's do that remotely!

#### Create the Docker context
In order to make it easier to switch between different Dockerized servers Docker Contexts was introduced.  So we will be creating a context on your local machine in order to easily switch to using Synology's Docker instance.



``` bash {linenos=table}
# Create the new context
docker context create syn-ssh --docker \
"host=ssh://you@your-synology"

# Verify the context was created
docker context ls
```
You should see two contexts listed.  The original default and the newly created "syn-ssh".

#### Change context and test
And now for the final test...

``` bash {linenos=table}
# Switch context
docker context use syn-ssh

# Test docker ps against the remote docker
docker ps
```

If you are seeing the containers that are running on your Synology then **SUCCESS**!!! Pat yourself on the back and enjoy.


<!--
## Notes

Ssh daemon was compiled with: `PATH=/usr/bin:/bin:/usr/sbin:/sbin`. You can see this in the `/etc/ssh/sshd_config` notes at the top.  Thus non-interactive shells or ssh commands will have that as its path.  This cannot be changed unless you wanna recompile (which we do not) therefore we shall enable "PermitUserEnvironment" in the sshd_config.  Uncomment and set this line to 'yes'.   You will notice that when you log in interactively you get a different PATH. `/sbin:/bin:/usr/sbin:/usr/bin:/usr/syno/sbin:/usr/syno/bin:/usr/local/sbin:/usr/local/bin`.  A number of things are happening here.  It seems that when logging in interactively bash is called as sh which changes its behavior but you can also use `—login` when it is called to allow it to load `/etc/profile` which is what sets your path etc during an interactive ssh session.
-->

### Helpful Links
[YouTube - Docker-Nuggets S1E1](https://www.youtube.com/watch?v=YX2BSioWyhI) & [Accompanying Docs for Elton's Video Above](https://github.com/sixeyed/youtube/tree/master/docker-nuggets/S1E1-docker-context)

[Bash - How to set PATH when running a ssh command? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/332532/how-to-set-path-when-running-a-ssh-command)

It is the little things that help so freaking much.
[How to check if a shell is login/interactive/batch - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/26676/how-to-check-if-a-shell-is-login-interactive-batch)

[Shell - "Command not found" when using ssh and non absolute commands - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/493287/command-not-found-when-using-ssh-and-non-absolute-commands)

Good ol’ official documentation ftw!
[Bash Startup Files (Bash Reference Manual)](https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html)

[Configure Synology NAS SSH Key-based authentication](https://blog.aaronlenoir.com/2018/05/06/ssh-into-synology-nas-with-ssh-key/)

[How to fix the error “host key verification failed” – The Geek Diary](https://www.thegeekdiary.com/how-to-fix-the-error-host-key-verification-failed/)