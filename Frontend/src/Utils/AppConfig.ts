class AppConfig {

    // Backend urls:
    public readonly vacationByUsersUrl = "http://localhost:4000/api/vacations-by-user/";
    public readonly vacationsUrl = "http://localhost:4000/api/vacations/";
    public readonly registerUrl = "http://localhost:4000/api/register/";
    public readonly loginUrl = "http://localhost:4000/api/login/";
    public readonly favoritesUrl = "http://localhost:4000/api/like/";
    public readonly tokenUrl = "http://localhost:4000/api/validate-token/";
   public readonly imageUrl =  "http://localhost:4000/api/vacations/images/"
   public readonly googleUrl =  "http://localhost:4000/api/auth/google/token/";
   public readonly CLIENT_ID = "736266445281-nc65m5r59p3uq821478ivh01m4m6gm9s.apps.googleusercontent.com"

    //Axios options:
    public readonly axiosOptions = (token:string)=>({
        headers: { // Tell axios to also send the image:
            "Content-Type": "multipart/form-data",
             "Authorization": `Bearer ${token}`
        }
    });
}

export const appConfig = new AppConfig();
