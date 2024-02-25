import { Router } from "express";
import { welcomeRoute } from "./routes/welcome.route";

export function api(app: Router){
    welcomeRoute(app);
}