# installation

apt-get update
apt-get upgrade

apt install curl
apt install build-essential
curl -qO- https://deb.nodesource.com/setup_12.x​ | sudo -E bash -
apt install nodejs

apt install npm

npm install discord.js --save
    *et toutes les librairy utiliser par le bot*


# lancer le bot en arriere plan
npm install pm2 -g
pm2 start index.js