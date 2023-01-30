import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "flowbite-react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

const GET_TOKEN = gql`
  query Query($password: String!, $email: String!) {
    getToken(password: $password, email: $email)
  }
`;

interface ILoginFormValues {
  email: string;
  password: string;
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
      .min(8, "Your password should have 8 caracters at least."),
  })
  .required();

function LoginContainer() {
  const navigate = useNavigate();
  const [login, { error }] = useLazyQuery(GET_TOKEN, {
    onCompleted(data: { getToken: string }) {
      localStorage.setItem("token", data.getToken);
      navigate("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ILoginFormValues> = async (data) => {
    login({
      variables: data,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-3/4 md:w-1/2 mx-auto mt-10 p-5 sm:px-20 sm:py-10 bg-[#273242] text-white"
    >
      <h1 className="text-center text-3xl font-aldrich">Login</h1>
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
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="text-sm text-red-600">
              {errors.password.message}
            </span>
          )}
        </label>
        {error?.message === "Invalid Auth" && (
          <span className="text-sm text-red-600">Invalid Credentials</span>
        )}
        <Link to="/login" className="text-sm block underline">
          Password forgotten
        </Link>
      </div>
      <div className="mb-6">
        <label
          htmlFor="remember"
          className="text-lg font-medium dark:text-gray-300"
        >
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 mr-2 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
          />
          Remember me
        </label>
      </div>
      <Button type="submit" gradientDuoTone="cyanToBlue" className="m-auto">
        SIGN IN
      </Button>
      <p className="text-center text-lg mt-5">
        <NavLink to="/register" className="underline">
          Sign up
        </NavLink>{" "}
        if you don&apos;t have an account yet !
      </p>
    </form>
  );
}

export default LoginContainer;
