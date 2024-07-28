# immagine base di Node
FROM node:16

WORKDIR /app

COPY ./app/package*.json ./app/
COPY ./serialPort/package*.json ./serialPort/

RUN cd app && npm install
RUN cd serialPort && npm install

RUN npm install -g electron

COPY ./app ./app
COPY ./serialPort ./serialPort

RUN ls -la /app
RUN cd app && npm run build
RUN cd serialPort && npm run build


# Comando per avviare sia il simulatore che l'applicazione
CMD ["sh", "-c", "node serialPort/dist/serialPort.js & electron app/dist/main.js"]
