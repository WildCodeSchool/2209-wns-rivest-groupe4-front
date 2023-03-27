import React, { useContext, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { UserContext } from "../contexts/UserContext";
import IUser from "../interfaces/IUser";

const GET_ONE_USER = gql`
  query Query($getOneUserId: String!) {
    getOneUser(id: $getOneUserId) {
      email
      dailyRuns
      premium
      pseudo
    }
  }
`;

const MODIFY_USER = gql`
  mutation ModifyUser(
    $modifyUserId: String!
    $email: String
    $password: String
    $pseudo: String
  ) {
    modifyUser(
      id: $modifyUserId
      email: $email
      password: $password
      pseudo: $pseudo
    )
  }
`;
function UserSpaceMyInformationsContainer() {
  const { user } = useContext(UserContext);
  const [userUpdates, setUserUpdates] = useState<{
    email?: string;
    pseudo?: string;
    password?: string;
  }>({
    email: user?.email,
    pseudo: user?.pseudo,
  });

  useQuery(GET_ONE_USER, {
    variables: { getOneUserId: user?.id },
    onCompleted(data: { getOneUser: IUser }) {
      // TODO refresh user context and local storage
      // TODO confirm update with success toast
    },
  });

  const [modifyUser, { loading }] = useMutation(MODIFY_USER);

  const handleClickModify = async () => {
    await modifyUser({
      variables: { ...userUpdates, modifyUserId: user?.id },
    });
  };

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="font-aldrich text-2xl leading-6 ">
              Personal Informations
            </h3>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="pseudo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Pseudo
                    </label>
                    <input
                      type="text"
                      name="pseudo"
                      value={userUpdates?.pseudo}
                      onChange={(e) => {
                        setUserUpdates({
                          ...userUpdates,
                          pseudo: e.target.value,
                        });
                      }}
                      id="pseudo"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="********"
                      onChange={(e) => {
                        setUserUpdates({
                          ...userUpdates,
                          password: e.target.value,
                        });
                      }}
                      id="password"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      value={userUpdates?.email}
                      onChange={(e) => {
                        setUserUpdates({
                          ...userUpdates,
                          email: e.target.value,
                        });
                      }}
                      name="email-address"
                      id="email-address"
                      autoComplete="email"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <Button
                  type="submit"
                  onClick={() => handleClickModify()}
                  gradientDuoTone="cyanToBlue"
                  className="m-auto"
                >
                  {loading && (
                    <div className="mr-3">
                      <Spinner size="sm" />
                    </div>
                  )}
                  SAVE CHANGES
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSpaceMyInformationsContainer;
