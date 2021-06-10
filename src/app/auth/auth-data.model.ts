export interface AuthData {
  FirstName : string;
  LastName :  string;
  Age : number;
  Email : string;
  UsrPwd : string;
  UsrRole : number;
  IsActive : boolean;
}

export interface LoginData {
  Email : string;
  UsrPwd : string;
}
