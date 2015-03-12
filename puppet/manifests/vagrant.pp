$PROJ_DIR = "/home/vagrant/"

Exec {
    path => "/usr/local/bin:/usr/bin:/usr/sbin:/sbin:/bin",
}

class dev {

    class {
        init:
    }
}

include dev

class init {

    group { "puppet":
        ensure => "present",
    }

    # Update the system
    exec { "update-apt":
        command => "sudo apt-get update",
    }

    # Install python packages we need
    package {
        ["python", "python-dev", "python-pip"]:
        ensure => installed,
        require => Exec['update-apt']
    }

    # Install other packages we need
    package {
        ["vim", "screen"]:
        ensure => installed,
        require => Exec['update-apt']
    }

    # Install project dependecies from pip
    exec { "pip-install-requirements":
        command => "sudo /usr/bin/pip install -r $PROJ_DIR/requirements.txt",
        tries => 2,
        timeout => 600, # Too long, but this can take awhile
        require => Package['python-pip', 'python-dev'], # The package dependecies needs to run first
        logoutput => on_failure,
    }

    # Install nodejs packages we need
    package {
        ["nodejs", "npm"]:
        ensure => installed,
        require => Exec['update-apt']
    }

}
