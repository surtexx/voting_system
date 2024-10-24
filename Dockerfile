FROM node:18

RUN apt-get update && apt-get install -y zsh
SHELL ["/bin/zsh", "-c"]

WORKDIR /app

COPY . .
RUN rm -rf node_modules .gitignore README.md

RUN npm install

CMD npx hardhat node&; npx hardhat run scripts/deploy.js --network localhost; node app.js