import moment, { Moment } from 'moment';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';

const TOKEN_TYPE = {
  access: 'access',
  refresh: 'refresh',
};

class TokenService {
  // eslint-disable-next-line class-methods-use-this
  public async generateToken(userId: string, tokenExpiry: Moment, tokenType: string, secret = config.jwt.secret) {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: tokenExpiry.unix(),
      type: tokenType,
    };
    return jwt.sign(payload, secret);
  }

  // eslint-disable-next-line class-methods-use-this
  public async decodeToken(token) {
    return jwt.verify(token, config.jwt.secret);
  }

  public async generateAuthTokens(user) {
    const accessTokenExpiry = moment().add(config.jwt.accessTokenExpiryMinutes, 'minutes');
    const accessToken = await this.generateToken(user._id, accessTokenExpiry, TOKEN_TYPE.access);

    const refreshTokenExpiry = moment().add(config.jwt.refreshTokenExpiryDays, 'days');
    const refreshToken = await this.generateToken(user._id, refreshTokenExpiry, TOKEN_TYPE.refresh);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpiry.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpiry.toDate(),
      },
    };
  }
}

export default TokenService;
