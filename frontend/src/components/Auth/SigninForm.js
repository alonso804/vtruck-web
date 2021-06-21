import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { FormHelperText } from "@material-ui/core";
import { Formik } from "formik";
import { AuthServices } from "../../services/AuthServices";
import { StorageService } from "../../services/StorageService";
import ErrorModal from "./ErrorModal";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SigninForm = () => {
  const classes = useStyles();
  const [fail, setFail] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const history = useHistory();

  const handleClose = () => {
    setFail(false);
  };

  return (
    <Formik
      initialValues={{
        username: "alonso804",
        password: "1234",
        /*
         *username: "",
         *password: "",
         */
      }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = "Username requerido";
        }

        if (!values.password) {
          errors.password = "Contraseña requerida";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        AuthServices.signin(values)
          .then((res) => {
            StorageService.setJWT(res.data.token);
            console.log("saved jwt: ", StorageService.getJWT());
            console.log("Logeado");
            history.push("/");
          })
          .catch((err) => {
            console.log("[Sign In] Error al iniciar sesión");
            console.error(err);
            setFail(true);
            setFailMessage(err.response.data.message);
          });
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={values.username}
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username && touched.username}
          />
          <FormHelperText style={{ color: "red" }}>
            {errors.password && touched.password && errors.password}
          </FormHelperText>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={values.password}
            autoComplete="current-password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
          />
          <FormHelperText style={{ color: "red" }}>
            {errors.password && touched.password && errors.password}
          </FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            className={classes.submit}
          >
            Iniciar sesión
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"¿No tienes cuenta? Regístrate"}
              </Link>
            </Grid>
          </Grid>
          <ErrorModal
            fail={fail}
            message={failMessage}
            handleClose={handleClose}
          />
        </form>
      )}
    </Formik>
  );
};

export default SigninForm;
