# specifically for backend, but need .env
FROM node:14

WORKDIR /app

COPY ./backend-server ./backend-server
COPY ./src/artifacts/contracts/ChessWager.sol/ChessWager.json ./src/artifacts/contracts/ChessWager.sol/ChessWager.json

# only in local
# COPY ./chess-wager-develop-firebase-adminsdk-z02bi-9bab414c8a.json ./
COPY .env .env

WORKDIR /app/backend-server

RUN npm install

CMD [ "npm", "start"]
