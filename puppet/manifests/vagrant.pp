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
        ["git", "vim", "screen"]:
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
        ["nodejs", "nodejs-legacy", "npm"]:
        ensure => installed,
        require => Exec['update-apt']
    }

    # Install packages required to run webdriver-manager
    package {
        ["default-jre"]:
        ensure => installed,
        require => Exec['update-apt']
    }


    # Disable any questions during npm-install
    file { "/etc/environment":
        content => inline_template("CI=true")
    }

    # Install angularjs related packages
    exec { "npm-install-packages":
        command => "npm install --quiet",
        tries => 2,
        timeout => 600,
        require => Package['nodejs', 'npm'],
        logoutput => on_failure,
    }

    # Install phantomjs
    exec { "npm install phantomjs --save-dev":
        command => "npm install phantomjs --save-dev",
        tries => 2,
        timeout => 600,
        require => Package['nodejs', 'npm'],
        logoutput => on_failure,
    }
}
