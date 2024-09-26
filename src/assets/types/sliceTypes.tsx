export interface UserType {
    id:string,
    email:string,
    password:string,
    balance:number
}

export interface ProductType {
    id:number,
    title:string,
    price:number,
    description:string,
    category:string,
    image:string,
    rating:RatingType

}

interface RatingType{
    rate:number,
    count:number
}
export interface AppSliceType {
    currentUser: UserType | null,
    loading:boolean,
    theme:boolean
}
export interface ProductSliceType {
    products: ProductType[];
  }
  