import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { VacationModel } from "../3-models/vacationModel";
import { fileSaver } from "uploaded-file-saver";
import { error } from "console";
import { userServices } from "./userServices";

class VacationsService {
  public async getAllVacations(userId: number): Promise<VacationModel[]> {
    const isUser: boolean = await userServices.isUserExist(userId);
    if (!isUser) throw new ResourceNotFoundError(userId);

    const sql = `
    SELECT 
      v.*, 
      MAX(IF(ul.isSaved = 1, 1, 0)) AS isSaved, 
      CAST(SUM(IF(l.isSaved = 1, 1, 0)) AS UNSIGNED) AS likesCount, 
      CONCAT('http://localhost:4000/api/vacations/images/', v.image) AS imageUrl
    FROM 
      vacations v
    LEFT JOIN 
      likes l ON v.id = l.vacationId AND l.isSaved = 1
    LEFT JOIN 
      likes ul ON v.id = ul.vacationId AND ul.userId = ?
    GROUP BY 
      v.id
    ORDER BY 
      v.startDate;`;

    const vacations: VacationModel[] = await dal.execute(sql, [userId]);
    return vacations;
  }

  public async getOneVacationById(userId: number, vacationId: number): Promise<VacationModel> {
    if (!(await userServices.isUserExist(userId))) {         
      throw new ResourceNotFoundError(userId);
    }
  
    const sql = `
    SELECT 
      v.*, 
      MAX(IF(ul.isSaved = 1, 1, 0)) AS isSaved, 
      CAST(SUM(IF(l.isSaved = 1, 1, 0)) AS UNSIGNED) AS likesCount, 
      CONCAT('http://localhost:4000/api/vacations/images/', v.image) AS imageUrl
    FROM 
      vacations v
    LEFT JOIN 
      likes l ON v.id = l.vacationId AND l.isSaved = 1
    LEFT JOIN 
      likes ul ON v.id = ul.vacationId AND ul.userId = ?
    WHERE 
      v.id = ?`;
  
    const vacations: VacationModel[] = await dal.execute(sql, [userId, vacationId]);
    
    if (vacations.length === 0 || Object.values(vacations[0]).every(val => val === null)) {
      throw new ResourceNotFoundError(vacationId);
    }
    const vacation: VacationModel = vacations[0];
    return vacation;
  }

  public async addVacation(vacation: VacationModel): Promise<void> {
    vacation.validateAdd();

    const imageName: string = await fileSaver.add(vacation.image);

    const sql = "insert into vacations values(default, ?, ?, ?, ?, ?, ?)";
    const values = [vacation.location, vacation.description, vacation.startDate, vacation.endDate, vacation.price, imageName];
    await dal.execute(sql, values);

    // run SHOW TRIGGERS to see triggers
  }

  public async deleteVacation(id: number): Promise<void> {
    const sql = "delete from vacations where id = ?";
    const info: OkPacketParams = await dal.execute(sql, [id]);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
  }

  public async updateIsSaved(isSaved: boolean, userId: number, vacationId: number): Promise<VacationModel> {
    const sql = "update likes set isSaved = ? where userId = ? and vacationId = ?";
    await dal.execute(sql, [isSaved, userId, vacationId]);
    const updatedVacation: VacationModel = await this.getOneVacationById(userId, vacationId);
    return updatedVacation;
  }

  public async updateVacation(vacationId: number, vacationBody: VacationModel, userId: number): Promise<VacationModel> {
    vacationBody.validateUpdate();

    const sql = `
        UPDATE vacations  SET  location = ?, description = ?,  startDate = ?,  endDate = ?,  price = ? WHERE id = ?`;

    const values = [vacationBody.location, vacationBody.description, vacationBody.startDate, vacationBody.endDate, vacationBody.price, vacationId];

    if (vacationBody.image) {
      const imageName: string = await fileSaver.add(vacationBody.image);
      const imageSql = `UPDATE vacations
        SET image = ?
        WHERE id = ?`;
      await dal.execute(imageSql, [imageName, vacationId]);
    }

    await dal.execute(sql, values);
    return await this.getOneVacationById(userId, vacationId);
  }
}

export const vacationsService = new VacationsService();
