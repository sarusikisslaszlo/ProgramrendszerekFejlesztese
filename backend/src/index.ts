import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import expressSession from 'express-session';
import passport from 'passport';
import { configurePassport } from './passport/passport';
import { configureRoutes } from './routes/routes';

const app = express();
const port = 5001;
const dbUrl = 'mongodb://localhost:27017/financial_app_db';

mongoose.connect(dbUrl).then((_) => {
    console.log('Successfully connected to MongoDB.')
}).catch(error => {
    console.log(error);
    return;
})

const whitelist = ['*', 'http://localhost:4200'];
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) => {
        if (whitelist.indexOf(origin!) !== -1 || whitelist.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS.'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

const sessionOptions: expressSession.SessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
}
app.use(expressSession(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use('/app', configureRoutes(passport, express.Router()));

app.listen(port, () => {
    console.log('Server is listening on port ' + port.toString());
})

console.log('After server is ready.');