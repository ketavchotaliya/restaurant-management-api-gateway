declare module Users {
  export interface Users {
    user_id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    user_type_id?: number;
    session_id?: number;
    is_active?: number;
    created_at?: Date;
    updated_at?: Date;
  }

  export interface UsersType {
    user_type_id?: number;
    user_type?: string;
  }
}

export = Users;
