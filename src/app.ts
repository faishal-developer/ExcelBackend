import express,{ Application, Request, Response } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import { globalErrorHandler } from "./middleWares/globalErrorHandler";
import { UserRoutes } from "./modules/user/user.route";
import { BookingRoutes } from "./modules/booking/bookings.route";
import { AdminRoutes } from "./modules/admin/admin.route";
import { AuthRoutes } from "./modules/Auth/auth.route";
import { ScheduleRoutes } from "./modules/flight/flight.route";
import { TraineeRoutes } from "./modules/trainee/trainee.route";
import { TrainerRoutes } from "./modules/trainer/trainer.route";

const app:Application = express();
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.get('/',(_req:Request,res:Response)=>{
    res.json({message:"Everything is working"});
})
app.use('/api/v1',UserRoutes);
app.use('/api/v1',BookingRoutes);
app.use('/api/v1',ScheduleRoutes);
app.use('/api/v1',AdminRoutes);
app.use('/api/v1',AuthRoutes);
app.use('/api/v1',TraineeRoutes);
app.use('/api/v1',TrainerRoutes);

//globalErrorhandler
app.use(globalErrorHandler)


//unknown route handler
app.use((req:Request,res:Response)=>{
    res.status(httpStatus.NOT_FOUND).json({
        success:false,
        message:'Route not found',
        errorMessages:[
            {
                path:req.originalUrl,
                message:'Api Not Found'
            }
        ]
    })
})

export default app;