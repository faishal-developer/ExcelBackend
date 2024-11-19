"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = require("./middleWares/globalErrorHandler");
const user_route_1 = require("./modules/user/user.route");
const bookings_route_1 = require("./modules/booking/bookings.route");
const admin_route_1 = require("./modules/admin/admin.route");
const auth_route_1 = require("./modules/Auth/auth.route");
const flight_route_1 = require("./modules/flight/flight.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//routes
app.get('/', (_req, res) => {
    res.json({ message: "Everything is working" });
});
app.use('/api/v1', user_route_1.UserRoutes);
app.use('/api/v1', bookings_route_1.BookingRoutes);
app.use('/api/v1', flight_route_1.FlightRoutes);
app.use('/api/v1', admin_route_1.AdminRoutes);
app.use('/api/v1', auth_route_1.AuthRoutes);
//globalErrorhandler
app.use(globalErrorHandler_1.globalErrorHandler);
//unknown route handler
app.use((req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Route not found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found'
            }
        ]
    });
});
exports.default = app;
