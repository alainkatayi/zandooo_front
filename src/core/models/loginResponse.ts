export interface LoginResponse {
    access: string;
    expiresIn: string;
    user:{
        id:number,
        username:string,
        first_name:string,
        last_name:string,
        email:string,
        role:string,
        has_shop: boolean,
        delivery_Agent_Profile?:{
            id:number,
            adress:string,
            delivery_start_time:string,
            delivery_end_time:string,
            phone_number:string,
        }
    }
}