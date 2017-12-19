## Installation

1. Install nodejs
```
dnf -y update
dnf -y install psmisc
dnf -y groupinstall "Development Tools"
curl --silent --location https://rpm.nodesource.com/setup_9.x | bash -
dnf -y install nodejs
```

2. Clone project
```
git clone https://github.com/metarhia/arhaica
```

3. Install mongodb
```
sudo dnf install -y mongodb-server
sudo systemctl enable mongod
sudo systemctl start mongod
```

4. Install dependencies
```
npm install
```

5. Allow port listening below 1024
```
setcap 'cap_net_bind_service=+ep' /path/to/node
```
