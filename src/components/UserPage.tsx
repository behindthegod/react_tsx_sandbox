import React, {FC, useEffect, useState} from 'react';
import {IUser} from "../types/types";
import axios from "axios";
import UserItem from "./UserItem";
import List from "./List";

const UserPage: FC = () => {

    const [users, setUsers] = useState<IUser[]>([])

    useEffect(()=> {
        fetchUsers()
    },[])

    async function fetchUsers() {
        try {
            const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
            setUsers(response.data)
        } catch (e) {
            alert(e)
        }
    }
    return (
        <div>
            <List items={users} renderItem={(u: IUser) => <UserItem user={u} key={u.id}/>
            }/>
        </div>
    );
};

export default UserPage;