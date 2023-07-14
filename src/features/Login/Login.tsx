import React from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { authThunks } from "./slice/auth-slice";
import { Navigate } from "react-router-dom";
import { selectorIsLoggedIn } from "./selectors";
import { validate } from "../../common/utils";
import { TextField } from "../../components/ui/text-field";
import { Button } from "../../components/ui/button";
import { Typography } from "../../components/ui/typography";
import { Card } from "../../components/ui/card";
import s from "./Login.module.scss";
import { Checkbox } from "../../components/ui/checkbox";

export const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectorIsLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate,
    onSubmit: (values) => {
      dispatch(authThunks.login(values));
    },
  });

  if (isLoggedIn) return <Navigate to={"/lists"} />;

  return (
    <Card className={s.card}>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.login}>
          <div>
            <Typography>
              To log in get registered{" "}
              <a
                href={"https://social-network.samuraijs.com/"}
                target={"_blank"}
              >
                here
              </a>
            </Typography>
            <Typography>or use common test account credentials:</Typography>
            <Typography>Email: free@samuraijs.com</Typography>
            <Typography>Password: free</Typography>
          </div>
          <div className={s.inputs}>
            <div>
              <TextField
                label="Email"
                {...formik.getFieldProps("email")}
                errorMessage={formik.errors.email}
              />
            </div>
            <div>
              <TextField
                type="password"
                label="Password"
                errorMessage={formik.errors.password}
                {...formik.getFieldProps("password")}
              />
            </div>
            <Checkbox
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
              label={"Remember me"}
            />
            <Button type={"submit"} fullWidth>
              Login
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};
