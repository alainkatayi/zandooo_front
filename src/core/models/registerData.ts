export interface Register_User_Data {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    delivery_Agent_Profile?: {
        id: number,
        adress: string,
        delivery_start_time: string,
        delivery_end_time: string,
        phone_number: string,
    }
}