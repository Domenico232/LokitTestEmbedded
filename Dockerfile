# Immagine base di Node
FROM node:16


# Installa Xvfb e altre dipendenze necessarie
RUN apt-get update && apt-get install -y \
    libgbm1 \
    libnss3 \
    libxkbcommon0 \
    libxss1 \
    libxtst6 \
    libgtk-3-0 \
    libasound2 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json per entrambe le applicazioni
COPY ./app/package*.json ./app/
COPY ./serialPort/package*.json ./serialPort/

# Installa le dipendenze per entrambe le applicazioni
RUN cd app && npm install
RUN cd serialPort && npm install

# Installa Electron e Electron Builder globalmente
RUN npm install -g electron electron-builder

# Copia il resto dell'applicazione
COPY ./app ./app
COPY ./serialPort ./serialPort

# Compila i file se hai un processo di build definito
RUN cd app && npm run build
RUN cd serialPort && npm run build

# Elenco dei file per verifica
RUN ls -la /app

# Comando per avviare sia il simulatore che l'applicazione
CMD ["sh", "-c", "node /app/serialPort/dist/spsimulator.js & electron /app/app/main.js"]
