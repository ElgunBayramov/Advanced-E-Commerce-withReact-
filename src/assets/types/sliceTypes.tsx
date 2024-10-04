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
    count?:number,
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
    categories: string[],
    product: ProductType | null,
    loading:boolean,
}

export interface BasketItemType {
    product: ProductType; // Assuming ProductType is already defined
    quantity: number;
}

export interface BasketSliceType {
    baskets: Record<string, BasketItemType[]>; // Each user has an array of basket items
}