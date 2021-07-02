import React, {
    useState,
    useRef,
    Fragment,
    useContext 
} from "react";
  
import axios  from "axios";
import Card from "../UI/Card/Card";
import classes from "./Auth.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/AuthContext";
  
const ChangePasswordForm = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [isShowForm, setShowForm] = useState(true);
    const [message, setMessage] = useState(null);

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    const passwordInput = useRef();

    const checkFomValidHandler= () => {
        if (
        passwordInput.current.value === "") {
            setIsFormValid(false);
            return;
    }
        setIsFormValid(true);
    }
  
    const submitHandler = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            return;
        }
        axios.post('http://localhost:5151/change_password',
            {
                "new_password": passwordInput.current.value
            },
            {
                headers: {
                    "Authorization": token
                }
            }
        )

        .then(response => {
            if (response.status === 200) {
                setMessage("Password has changed");
                setShowForm(false);
                return;
            }
            setMessage("Failed to change password. Please check information!");
        })
        .catch((error) => {
            setMessage(error.message);
        });
    };
  
    return (
        <Fragment>
            <Card className={classes.auth}>
                {message != null && <p className={classes.error}>{message}</p>}
                {isShowForm && (
                    <form onSubmit={submitHandler}>
                        <div className={classes.control}>
                          <label htmlFor="password">New Password</label>
                          <input type="password"
                              id="password"
                              ref={passwordInput}
                              onChange={checkFomValidHandler}
                          />
                        </div>
                        <div className={classes.actions}>
                            <Button
                                type="submit"
                                className={classes.btn}
                                disabled={!isFormValid}
                            >
                                Change Password
                            </Button>
                        </div>
                    </form>
                )}
            </Card>
        </Fragment>
    );
};
  
export default ChangePasswordForm;  