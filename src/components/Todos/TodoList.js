import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";

import classes from "./TodoList.module.css";
import AuthContext from "../../store/AuthContext";

const TodoList = () => {
    const [todoList, setTodoList] = useState(null);
    const [error, setError] = useState(null);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get("http://localhost:5151/todos", {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                setTodoList(response.data.data);
                setError(null);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        history.push("/login");
                        return;
                    }
                }
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            <h2 className={classes.title}>To do List</h2>
            {error && <p>{error}</p>}
            <div className={classes.todo}>
                {isLoading && <p>Loading To do List...</p>}
                {todoList && (
                    <ul>
                        {todoList.map((todo) => (
                            <li className={classes.todoslist} key={todo.id}>
                                <h2>{todo.title}</h2>
                                <p>{todo.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TodoList;
