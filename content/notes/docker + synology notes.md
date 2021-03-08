# Configuring SSH keys for synology login
# On client machine
# Add ssh-key to synology
ssh-copy-id $(id -un)@your-synology-hostname

# On the synology
# Enable logging with HostKey by uncommenting the following
#  - RSAAuthentication yes
#  - PubkeyAuthentication yes
#  - HostKey /etc/ssh/ssh_host_rsa_key
#  - HostKey /etc/ssh/ssh_host_ed25519_key
sudo vi /etc/ssh/sshd_config

# Restart sshd
sudo synoservicectl --reload sshd

# Fix permissions on user directory
sudo chmod 755 ~
sudo chmod 755 -R ~/.ssh

# On client machine
# Testing logging in with key
ssh your-synology-hostname



# Configuring Docker on the synology
# On the synology
# First check version is 18.09 or later
sudo docker version

# Next up we need to enable the user
# to run docker without the need for sudo
sudo synogroup --add docker $(id -un)

# grant the docker group access to the socket
sudo chown root:docker /var/run/docker.sock

# Log out and back into to see if you can run
docker ps
# without the need for sudo