import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "flowbite-react";

import { NavLink, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import ITokenWithUserValues from "../interfaces/ITokenWithUser";

const CREATE_USER = gql`
  mutation Mutation($pseudo: String!, $password: String!, $email: String!) {
    createUser(pseudo: $pseudo, password: $password, email: $email) {
      token
      user {
        id
      }
    }
  }
`;

interface IRegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  pseudo: string;
}

/* --------------------FORM VALIDATION-------------------- */
const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email.")
      .required("Please enter an email."),
    password: yup
      .string()
      .required("Please enter a password.")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\\"()\\[\]-]{8,25}$/,
        "Should have one uppercase letter, one lowercase letter, one number. Should have min 8 and max 25 characters.",
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match."),
    pseudo: yup
      .string()
      .required("Please enter pseudo.")
      .matches(/^[a-zA-Z0-9]+$/, "Use only letter and number."),
  })
  .required();

function RegisterContainer() {
  document.title = "Codeless4 | Register";

  const navigate = useNavigate();
  const [signUp, { error }] = useMutation(CREATE_USER, {
    onCompleted(data: { createUser: ITokenWithUserValues }) {
      localStorage.setItem("token", data.createUser.token);
      localStorage.setItem("uuid", data.createUser.user.id);
      navigate("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IRegisterFormValues> = async (fields) => {
    signUp({
      variables: {
        email: fields.email,
        password: fields.password,
        pseudo: fields.pseudo,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-3/4 md:w-1/2 mx-auto mt-10 p-5 sm:px-20 sm:py-10 bg-[#273242] text-white"
    >
      <h1 className="text-center text-3xl font-aldrich">Register</h1>
      <div className="my-6">
        <label
          htmlFor="email"
          className="block mb-2 text-lg font-medium  dark:text-white"
        >
          Email
          <input
            type="email"
            id="email"
            {...register("email")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            autoComplete="username"
          />
          {errors.email && (
            <span className="text-sm text-red-600">{errors.email.message}</span>
          )}
        </label>
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-lg font-medium  dark:text-white"
        >
          Password
          <input
            type="password"
            id="password"
            {...register("password")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            autoComplete="new-password"
          />
          {errors.password && (
            <span className="text-sm text-red-600">
              {errors.password.message}
            </span>
          )}
        </label>
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirm-password"
          className="block text-lg font-medium  dark:text-white"
        >
          Confirm Password
          <input
            type="password"
            id="confirm-password"
            {...register("confirmPassword")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        {error?.message === "Invalid Auth" && (
          <span className="text-sm text-red-600">Invalid Credentials</span>
        )}
      </div>
      <div className="my-6">
        <label
          htmlFor="pseudo"
          className="block mb-2 text-lg font-medium dark:text-white"
        >
          Pseudo
          <input
            type="pseudo"
            id="pseudo"
            {...register("pseudo")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.pseudo && (
            <span className="text-sm text-red-600">
              {errors.pseudo.message}
            </span>
          )}
        </label>
      </div>
      <Button type="submit" gradientDuoTone="cyanToBlue" className="m-auto">
        SIGN UP
      </Button>
      <p className="text-center text-lg mt-5">
        <NavLink to="/login" className="underline">
          Sign in
        </NavLink>{" "}
        if you have an account yet !
      </p>
    </form>
  );
}

export default RegisterContainer;
