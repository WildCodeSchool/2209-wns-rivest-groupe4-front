import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";

import IUser from "../interfaces/IUser";
import SharedProjectsListing from "../components/SharedProjectListing";
import IProjectsListing from "../interfaces/IProjectsListing";
import ILike from "../interfaces/ILike";

const GET_ONE_USER = gql`
  query Query($getOneUserId: String!) {
    getOneUser(id: $getOneUserId) {
      email
      dailyRuns
      hashedPassword
      premium
      pseudo
    }
  }
`;

const GET_USER_PROJECTS = gql`
  query Query($userId: String!) {
    getProjectsByUserId(userId: $userId) {
      comments {
        id
      }
      createdAt
      description
      updatedAt
      name
      isPublic
      id
      user {
        id
        pseudo
      }
    }
  }
`;

const GET_PROJECTS_SUPPORTED = gql`
  query Query($userId: String!) {
    getProjectsSupported(userId: $userId) {
      comments {
        id
      }
      createdAt
      description
      updatedAt
      name
      isPublic
      id
      user {
        id
        pseudo
      }
    }
  }
`;

const GET_USER_LIKES = gql`
  query Query($userId: String!) {
    getAllLikesByUser(userId: $userId) {
      id
    }
  }
`;

function UserSpaceContainer() {
  const [mail, setMail] = useState<string>("");
  const [name, setName] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, setPassword] = useState<string>("*************");
  const [pseudo, setPseudo] = useState<string>("");
  const [dailyRuns, setDailyRuns] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [informationsModification, setInformationsModification] =
    useState<boolean>(false);
  const [userProjects, setUserProjects] = useState<IProjectsListing[]>();
  const [supportedProjects, setSupportedProject] =
    useState<IProjectsListing[]>();
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [userProjectsMore, setUserProjectsMore] = useState<boolean>(false);
  const [supportedProjectsMore, setSupportedProjectsMore] =
    useState<boolean>(false);

  const [getUser] = useLazyQuery(GET_ONE_USER, {
    variables: { getOneUserId: localStorage.getItem("uuid") },
    onCompleted(data: { getOneUser: IUser }) {
      setName("Jean-Claude");
      setMail(data.getOneUser.email);
      setIsPremium(data.getOneUser.premium);
      setPseudo(data.getOneUser.pseudo);
      setDailyRuns(data.getOneUser.dailyRuns);
    },
  });

  const [getUserProjects] = useLazyQuery(GET_USER_PROJECTS, {
    variables: { userId: localStorage.getItem("uuid") },
    onCompleted(data: { getProjectsByUserId: IProjectsListing[] }) {
      setUserProjects(data.getProjectsByUserId);
    },
  });

  const [getSupportedProjects] = useLazyQuery(GET_PROJECTS_SUPPORTED, {
    variables: { userId: localStorage.getItem("uuid") },
    onCompleted(data: { getProjectsSupported: IProjectsListing[] }) {
      setSupportedProject(data.getProjectsSupported);
    },
  });

  const [getUserLikes] = useLazyQuery(GET_USER_LIKES, {
    variables: { userId: localStorage.getItem("uuid") },
    onCompleted(data: { getAllLikesByUser: ILike[] }) {
      setLikes(data.getAllLikesByUser.length);
    },
  });

  const handleClickModify = () => {
    setInformationsModification(!informationsModification);
  };

  useEffect(() => {
    getUser();
    getUserProjects();
    getSupportedProjects();
    getUserLikes();
  }, [getUser, getUserProjects, getSupportedProjects, getUserLikes]);

  return (
    <div className="flex flex-col h-full gap-16 mx-32 my-10">
      <div className="flex w-full justify-center">
        <h1 className="font-aldrich text-6xl">My account</h1>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-aldrich text-3xl">My informations :</h1>
        <div className="flex flex-col gap-5 m-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3 w-1/3">
              <p className="font-barlow text-xl">Name</p>
              {informationsModification ? (
                <input
                  className="w-full rounded-sm p-1"
                  value={name}
                  autoComplete={name}
                  onChange={() => {}}
                />
              ) : (
                <div className="w-full rounded-sm p-1 pl-2 font-bold bg-white text-black">
                  {name}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 w-1/3">
              <p className="font-barlow text-xl">Mail</p>
              {informationsModification ? (
                <input
                  className="w-full rounded-sm p-1 "
                  type="email"
                  value={mail}
                  onChange={() => {}}
                />
              ) : (
                <div className="w-full rounded-sm p-1 pl-2 font-bold bg-white text-black">
                  {mail}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3 w-1/3">
              <p className="font-barlow text-xl">Pseudo</p>
              {informationsModification ? (
                <input
                  className="w-full rounded-sm p-1"
                  value={pseudo}
                  autoComplete={pseudo}
                  onChange={() => {}}
                />
              ) : (
                <div className="w-full rounded-sm p-1 pl-2 font-bold bg-white text-black">
                  {pseudo}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 w-1/3">
              <p className="font-barlow text-xl">Password</p>
              {informationsModification ? (
                <input
                  type="password"
                  className="w-full rounded-sm p-1"
                  value={password}
                  autoComplete={password}
                  onChange={() => {}}
                />
              ) : (
                <div className="w-full rounded-sm p-1 pl-2 font-bold bg-white text-black">
                  {password}
                </div>
              )}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          onClick={() => handleClickModify()}
          gradientDuoTone="cyanToBlue"
          className="m-auto"
        >
          {informationsModification ? "ACCEPT CHANGES" : "MODIFY"}
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-aldrich text-3xl">My projects :</h1>
        {!userProjectsMore && userProjects ? (
          <SharedProjectsListing
            id={userProjects[0].id}
            comments={userProjects[0].comments}
            description={userProjects[0].description}
            likes={userProjects[0].likes}
            name={userProjects[0].name}
            updatedAt={userProjects[0].updatedAt}
            user={userProjects[0].user}
            key={userProjects[0].id}
            isPublic={userProjects[0].isPublic}
            isUserProject
          />
        ) : (
          userProjects &&
          userProjects.map((el) => (
            <SharedProjectsListing
              id={el.id}
              comments={el.comments}
              description={el.description}
              likes={el.likes}
              name={el.name}
              updatedAt={el.updatedAt}
              isPublic={userProjects[0].isPublic}
              user={el.user}
              key={el.id}
              isUserProject
            />
          ))
        )}
        <div className="flex justify-center items-center w-full ">
          <img
            role="presentation"
            src={`/assets/arrow-${!userProjectsMore ? "down" : "up"}.svg`}
            alt="arrowDown"
            className="w-14 h-14 p-2 border-2 border-white m-8 rounded-full cursor-pointer"
            onClick={() => setUserProjectsMore(!userProjectsMore)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-aldrich text-3xl">Projects supported :</h1>
        {!supportedProjectsMore && supportedProjects ? (
          <SharedProjectsListing
            id={supportedProjects[0].id}
            comments={supportedProjects[0].comments}
            description={supportedProjects[0].description}
            likes={supportedProjects[0].likes}
            name={supportedProjects[0].name}
            updatedAt={supportedProjects[0].updatedAt}
            user={supportedProjects[0].user}
            key={supportedProjects[0].id}
            isPublic={supportedProjects[0].isPublic}
          />
        ) : (
          supportedProjects &&
          supportedProjects.map((el) => (
            <SharedProjectsListing
              id={el.id}
              comments={el.comments}
              description={el.description}
              likes={el.likes}
              name={el.name}
              updatedAt={el.updatedAt}
              isPublic={el.isPublic}
              user={el.user}
              key={el.id}
            />
          ))
        )}
        <div className="flex justify-center items-center w-full">
          <img
            role="presentation"
            src={`/assets/arrow-${!supportedProjectsMore ? "down" : "up"}.svg`}
            alt="arrowDown"
            className="w-14 h-14 p-2 border-2 border-white m-8 rounded-full cursor-pointer"
            onClick={() => setSupportedProjectsMore(!supportedProjectsMore)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-aldrich text-3xl">My account access :</h1>
        <div className="flex items-center gap-2">
          <p
            className={
              !isPremium
                ? "bg-gradient-to-r bg-clip-text text-transparent from-orange-800 via-orange-500 to-yellow-600 animate-premiumColorChanging text-xl font-bold"
                : "text-green-600 text-xl font-bold"
            }
          >
            ● {isPremium ? "Free" : "Premium"} account
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p>Number of run today</p>
          <div className="flex items-center w-full bg-white rounded-sm h-6">
            <p
              className="font-bold text-black bg-green-600 flex justify-center"
              style={{ width: `${((dailyRuns + 1) / 50) * 100}%` }}
            >
              {dailyRuns + 1}
            </p>
            <p
              className="font-bold text-black flex justify-center"
              style={{ width: `${((50 - dailyRuns + 1) / 50) * 100}%` }}
            >
              {50 - dailyRuns - 1}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p>Number of likes this month</p>
          <div className="flex items-center justify-center w-full bg-white rounded-sm h-6">
            <p
              className="font-bold text-black bg-red-500 flex justify-center"
              style={{ width: `${((likes + 1) / 5) * 100}%` }}
            >
              {likes}
            </p>
            <p
              className="font-bold text-black flex justify-center"
              style={{ width: `${((5 - likes + 1) / 5) * 100}%` }}
            >
              5
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p>Number commentaries this month</p>
          <div className="flex items-center justify-center w-full bg-white rounded-sm h-6">
            <p
              className="font-bold text-black bg-red-500 flex justify-center"
              style={{ width: `${((likes + 1) / 5) * 100}%` }}
            >
              {likes}
            </p>
            <p
              className="font-bold text-black flex justify-center"
              style={{ width: `${((5 - likes + 1) / 5) * 100}%` }}
            >
              5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSpaceContainer;
