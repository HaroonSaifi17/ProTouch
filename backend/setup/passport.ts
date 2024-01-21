import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

const options = ExtractJwt.fromAuthHeaderAsBearerToken();

const adminOptions: StrategyOptions = {
  jwtFromRequest: options,
  secretOrKey: process.env.JWT_ADMIN_SECRET || '',
};

passport.use('adminJwt', new Strategy(adminOptions, (payload, done) => done(null, payload)));

passport.use(
  new LocalStrategy((username, password, done) => {
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return done(null, { username: process.env.ADMIN_USERNAME });
    } else {
      return done(null, false);
    }
  })
);
