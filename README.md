# NodeJsBE_SCS
Servizio backend per la realizzazione di un servizio REST API scritto in NestJS.

Il servizio si occupa di fornire le REST API per un parcheggio smart dotato di sensori.

## Comandi
Per far partire il progetto:

1. Clonare la repository in locale o su un server.
2. Eseguire nella cartella `root` il comando `npm install` per installare le dipendenze.
3. Creare un file `.env` nella cartella `root` del progetto con questi comandi:

<code>

    # database postgres
    DATABASE_HOST = localhost
    DATABASE_PORT = 5432
    DATABASE_USERNAME = username
    DATABASE_PASSWORD = password
    DATABASE_DATABASE = mydatabase
</code>

4. Eseguire nella cartella `root` il comando `npm start` per far partire il servizio in produzione, mentre eseguire il comando `npm run start:dev` per far partire il servizio in fase di sviluppo.