import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Controller } from './routes/route';
import http from "http";
import helmet from 'helmet';


class App {
  //set types
  public app: Application;
  public controller: Controller;
  public server: http.Server;

  constructor() {
    this.app = express();
    
      //connect server to app instance
    this.server = http.createServer(this.app);

    this.setConfig();
    this.controller = new Controller(this.app);
  }

  private setConfig() {
    //Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: '50mb' }));

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    //Enables cors   
    this.app.use(cors());

    this.app.use(express.static('public'));

    this.app.use(helmet());

  }



}

export default new App().server;








