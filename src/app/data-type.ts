export interface SignUp {
  name: string;
  password: string;
  email: string;
}

export interface Login {
  password: string;
  email: string;
}

export interface product{
  name:string,
  price:number,
  category:string,
  color:string,
  description:string,
  image:string
}