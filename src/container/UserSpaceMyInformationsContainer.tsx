import React, { useContext, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { useMutation } from "@apollo/client";
import { MODIFY_USER } from "../apollo/mutations";
import AlertContext from "../contexts/AlertContext";
import IUser from "../interfaces/IUser";

interface IUserInformationsProps {
  user: IUser;
  refetch: () => void;
}

function UserSpaceMyInformationsContainer({
  user,
  refetch,
}: IUserInformationsProps) {
  const { showAlert } = useContext(AlertContext);

  const [userUpdates, setUserUpdates] = useState<{
    email?: string;
    pseudo?: string;
    password?: string;
  }>({
    email: user?.email,
    pseudo: user?.pseudo,
  });

  const [modifyUser, { loading }] = useMutation(MODIFY_USER, {
    onError: (error) => {
      showAlert(error.message, "error");
    },
    onCompleted: async () => {
      await refetch();
      showAlert("Informations updated", "success");
    },
  });

  const handleClickModify = async () => {
    await modifyUser({
      variables: { ...userUpdates, modifyUserId: user.id },
    });
  };
  // TODO confirm update with success toast

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
                    </label>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
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
                    </label>
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
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
                    </label>
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
