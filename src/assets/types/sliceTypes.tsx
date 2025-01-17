export interface UserType {
    id:string;
    email:string;
    password:string;
    balance:number
}

export interface ProductType {
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
    rating:RatingType
}

interface RatingType{
    rate:number;
    count:number
}
export interface AppSliceType {
    currentUser: UserType | null;
    loading:boolean;
    theme:boolean
}
export interface ProductSliceType {
    products: ProductType[];
    categories: string[];
    product: ProductType | null;
    loading:boolean;
}

// export interface BasketItemType {
//     product: ProductType; 
//     count?: number;
// }

export interface BasketSliceType {
    baskets: {[userId:string]:{product: ProductType; count?:number;}[]};
    drawer: boolean;
    totalAmount:number;
}