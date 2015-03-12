# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

hosts = {
  "web" => "192.168.33.33",
}

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  hosts.each do |name, ip|
    config.vm.define name do |machine|
      machine.vm.box = "ubuntu/trusty64"
      machine.vm.hostname = "%s.local" % name
      machine.vm.network :private_network, ip: ip

      machine.vm.synced_folder ".", "/home/vagrant/"

      machine.vm.provision :puppet do |puppet|
          puppet.manifests_path = "puppet/manifests"
          puppet.manifest_file  = "vagrant.pp"
      end
    end
  end
end
