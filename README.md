## Installation

1. Clone project
```
git clone https://github.com/metarhia/arhaica
```

2. Install mongodb
```
sudo dnf install -y mongodb-server
sudo systemctl enable mongod
sudo systemctl start mongod
```

3. Install dependencies
```
npm install
```

4. Allow port listening below 1024
```
setcap 'cap_net_bind_service=+ep' /path/to/node
```
