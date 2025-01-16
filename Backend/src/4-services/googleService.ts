import { OAuth2Client } from "google-auth-library";
import { UserModel } from "../3-models/userModel";
import { cyber } from "../2-utils/cyber";
import { Role } from "../3-models/enums";
import { dal } from "../2-utils/dal";
import { ValidationError } from "../3-models/client-errors";
import { OkPacketParams } from "mysql2";
import { appConfig } from "../2-utils/app-config";

class GoogleService {
  public constructor(){
    this.client = new OAuth2Client(appConfig.CLIENT_ID)
  }
public client  

public async login(id_token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: id_token,
      audience: appConfig.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const user = new UserModel({ firstName: payload.given_name, lastName: payload.family_name, email: payload.email });
    return cyber.generateNewToken(user);
  }

  public async register(idToken: string): Promise<string> {
    const ticket = await this.client.verifyIdToken({
      idToken: idToken,
      audience: appConfig.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    let user = new UserModel({ firstName: payload.given_name, lastName: payload.family_name, email: payload.email, googleId: payload.sub });

    const sql = "INSERT INTO users (firstName, lastName, email, roleId, googleId) VALUES (?, ?, ?, ?, ?)";
    user.roleId = Role.User;
    user.validate();

    const emailIsUnique: boolean = await this.isEmailUnique(user.email);
    if (!emailIsUnique) {
      throw new ValidationError("Email is already in use.");
    }

    const values = [user.firstName, user.lastName, user.email, user.roleId, user.googleId];

    const info: OkPacketParams = await dal.execute(sql, values);
    user.id = info.insertId;
    console.log(user);

    const token = cyber.generateNewToken(user);
    return token;
  }

  private async isEmailUnique(email: string): Promise<boolean> {
    const sql = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
    const result = await dal.execute(sql, [email]);
    return result[0].count === 0;
  }
}

export const googleService = new GoogleService();
