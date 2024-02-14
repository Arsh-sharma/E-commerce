export interface SignUp {
  name: string;
  password: string;
  email: string;
}

export interface Login {
  password: string;
  email: string;
}

export interface product {
  id: string;
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  quantity: undefined | number;
  productId: undefined | string;
}

export interface cart {
  id: string | undefined;
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  quantity: undefined | number;
  userId: string;
  productId: string;
}
