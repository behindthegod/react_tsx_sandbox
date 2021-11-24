import React, {useEffect, useState} from 'react';
import Card, {CardVariant} from "./components/Card";
import {ITodo, IUser} from "./types/types";
import axios from "axios";
import List from "./components/List";
import UserItem from "./components/UserItem";
import {ifError} from "assert";
import TodoItem from "./components/TodoItem";
import EventExample from "./components/EventExample";


const App = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [todos, setTodos] = (useState<ITodo[]>([]))

    useEffect(()=> {
        fetchUsers()
        fetchTodos()
    },[])

    async function fetchUsers() {
        try {
            const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
            setUsers(response.data)
        } catch (e) {
            alert(e)
        }
    }

    async function fetchTodos() {
        try {
            const response = await axios.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
            setTodos(response.data)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div>
            <EventExample/>
            <Card onClick={(num) => console.log('click', num)} variant={CardVariant.outlined} height='200px'
                  width='200px'>
                <button>кнопка</button>
            </Card>
            <List items={users} renderItem={(u: IUser) => <UserItem user={u} key={u.id}/>
            }/>
            <List items={todos} renderItem={(todo: ITodo) => <TodoItem todo={todo} key={todo.id}/>
            }/>
        </div>
    );
};

export default App;