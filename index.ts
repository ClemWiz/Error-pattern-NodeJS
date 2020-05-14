import app from "./app";
import cron from './cron';

/*
 * START CRON
 */
cron();

/*
 * START SERVER
 */
const port = 8080;
app.listen(port);
