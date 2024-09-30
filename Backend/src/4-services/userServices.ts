import { OkPacketParams } from "mysql2";
import { cyber } from "../2-utils/cyber";
import { dal } from "../2-utils/dal";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";
import { CredentialsModel } from "../3-models/credentials-model";
import { Role } from "../3-models/enums";
import { UserModel } from "../3-models/userModel";

class UserServices {
  public async register(user: UserModel): Promise<string> {
    const sql = "insert into users values (default, ?, ?, ?, ?, ?)";
    user.roleId = Role.User;
    user.validate();

    const emailIsUnique: boolean = await this.isEmailUnique(user.email);
    if (!emailIsUnique) {
      throw new ValidationError("Email is already in use.");
    }

    user.password = cyber.hash(user.password);
    const values = [user.firstName, user.lastName, user.email, user.password, user.roleId];
    const info: OkPacketParams = await dal.execute(sql, values);
    user.id = info.insertId;

    // run SHOW TRIGGERS to see triggers

    const token: string = cyber.generateNewToken(user);
    return token;
  }

  public async login(credentials: CredentialsModel): Promise<string> {
    credentials.password = cyber.hash(credentials.password);
    const sql = `SELECT * FROM users WHERE email = ? and password = ?`;
    const values = [credentials.email, credentials.password];
    const response = await dal.execute(sql, values);
    const user: UserModel = response[0];
    if (!user) throw new UnauthorizedError("email or password are incorrect");
    const token: string = cyber.generateNewToken(user);
    return token;
  }

  private async isEmailUnique(email: string): Promise<boolean> {
    const sql = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
    const result = await dal.execute(sql, [email]);
    return result[0].count === 0;
  }

  public async isTokenValid(token: string): Promise<boolean> {
    const isTokenValid: boolean = cyber.isTokenValid(token);
    return isTokenValid;
  }

  public async isUserExist(userId: number): Promise<boolean> {
    const sql = "SELECT id FROM users WHERE id = ?";
    const result = await dal.execute(sql, [userId]);
    const exists = result.length > 0;
    return exists;
  }
}

export const userServices = new UserServices();
