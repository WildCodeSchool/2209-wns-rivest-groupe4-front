import { useState } from "react";
// import { Button } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

const GET_TOKEN = gql`
  query Query($password: String!, $email: String!) {
    getToken(password: $password, email: $email)
  }
`;

function LoginContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [loadToken, { error }] = useLazyQuery(GET_TOKEN, {
    onCompleted(data: { getToken: string }) {
      localStorage.setItem("token", data.getToken);
      navigate("/");
    },
  });

  return (
    <div className="w-1/2 mx-auto mt-10 px-20 py-10 bg-[#273242] text-white">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loadToken({
                  variables: {
                    email,
                    password,
                  },
                });
              }
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loadToken({
                  variables: {
                    email,
                    password,
                  },
                });
              }
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </label>
        {error?.message === "Invalid Auth" && (
          <span className="text-sm text-red-600">
            Email or password invalid
          </span>
        )}
        <Link to="/login" className="text-sm block">
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
            required
          />
          Remember me
        </label>
      </div>
      {/* <Button
        onClick={() => {
          loadToken({
            variables: {
              email,
              password,
            },
          });
        }}
        gradientDuoTone="cyanToBlue"
      >
        SIGN UP
      </Button> */}
      <p className="text-center text-lg mt-5">
        <NavLink to="/register" className="underline">
          Sign up
        </NavLink>{" "}
        if you don&apos;t have an account yet !
      </p>
    </div>
  );
}

export default LoginContainer;
