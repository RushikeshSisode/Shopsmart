// User Types
export interface IUser {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Product Types
export interface IReview {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  brand: string;
  quantity: number;
  category: string | ICategory;
  description: string;
  reviews: IReview[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  createdAt: string;
  updatedAt: string;
}

// Category Types
export interface ICategory {
  _id: string;
  name: string;
}

// Cart Types
export interface ICartItem extends IProduct {
  qty: number;
}

// Order Types
export interface IOrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
  _id?: string;
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IPaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface IOrder {
  _id: string;
  user: string | IUser;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentResult?: IPaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterData {
  username: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

// API Response Types
export interface IProductsResponse {
  products: IProduct[];
  page: number;
  pages: number;
  hasMore: boolean;
}

export interface IErrorResponse {
  message: string;
  status?: number;
}

// Cart State
export interface ICartState {
  cartItems: ICartItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}

// Shop State
export interface IShopState {
  categories: ICategory[];
  products: IProduct[];
  checked: string[];
  radio: any[];
  brandCheckboxes: { [key: string]: boolean };
  checkedBrands: string[];
  selectedBrand?: string;
}

// Favorites State
export type IFavoritesState = IProduct[];