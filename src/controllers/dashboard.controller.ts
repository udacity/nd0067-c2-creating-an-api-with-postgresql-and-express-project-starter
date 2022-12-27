import express,{Router} from 'express'

class DashboardController{

    public static index(req:express.Request,res:express.Response){
        res.sendStatus(200);
    }
}

const dashboardRouter:Router = Router()

dashboardRouter.get('/',DashboardController.index);

export {
    DashboardController,
    dashboardRouter,
};