import React, { useState, useRef, Fragment, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./CreateTodo.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/AuthContext";

const CreateTodoForm = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [isShowForm, setShowForm] = useState(true);
    const [message, setMessage] = useState(null);

    const titleInput = useRef();
    const descriptionInput = useRef();

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    const checkFomValidHandler = () => {
        if (
            titleInput.current.value === "" ||
            descriptionInput.current.value === ""
        ) {
            setIsFormValid(false);
            return;
        }
        setIsFormValid(true);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            return;
        }
        const createTodoAPI = "http://localhost:5151/todos";
        const createTodoData = {
            title: titleInput.current.value,
            description: descriptionInput.current.value,
        };
        fetch(createTodoAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(createTodoData),
        })
            .then((response) => {
                if (response.status === 200) {
                    setMessage("Signup successfully");
                    setShowForm(false);
                    return;
                }
                setMessage("Failed to create Todo, please check information!");
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        history.push("/login");
                        return;
                    }
                }
                setError(error.message);
            });
    };

    return (
        <Fragment>
            <Card className={classes.auth}>
                {message != null && <p className={classes.error}>{message}</p>}
                {isShowForm && (
                    <form onSubmit={submitHandler}>
                        <div className={classes.control}>
                            <label htmlFor="title">Title</label>
                            <input
                                type="title"
                                id="title"
                                ref={titleInput}
                                onChange={checkFomValidHandler}
                            />
                        </div>
                        <div className={classes.control}>
                            <label htmlFor="description">Description</label>
                            <textarea
                                type="description"
                                id="description"
                                ref={descriptionInput}
                                onChange={checkFomValidHandler}
                            />
                        </div>
                        <div className={classes.actions}>
                            <Button
                                type="submit"
                                className={classes.btn}
                                disabled={!isFormValid}
                            >
                                CreateTodo
                            </Button>
                        </div>
                    </form>
                )}
            </Card>
        </Fragment>
    );
};

export default CreateTodoForm;
