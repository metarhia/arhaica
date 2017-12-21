## Installation

1. Install nodejs
```
sudo dnf -y update
sudo dnf -y install psmisc
sudo dnf -y groupinstall "Development Tools"
sudo curl --silent --location https://rpm.nodesource.com/setup_9.x | bash -
sudo dnf -y install nodejs
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
sudo setcap 'cap_net_bind_service=+ep' "$(which node)"
```

6. Start the server
```
./server.sh
```
if you skipped 5-th step run this instead
```
sudo ./server.sh
```
