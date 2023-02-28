import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Button } from "flowbite-react";
import { NavLink } from "react-router-dom";

import IUser from "../interfaces/IUser";
import ProjectsListing from "../components/ProjectListing";
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
      likes {
        user {
          id
          pseudo
        }
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
      likes {
        user {
          id
          pseudo
        }
      }
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

const GET_USER_COMMENTS = gql`
  query GetAllCommentsByUser($userId: String!) {
    getAllCommentsByUser(userId: $userId) {
      id
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

function UserSpaceContainer() {
  const [mail, setMail] = useState<string>("");
  const [name, setName] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, setPassword] = useState<string>("*************");
  const [pseudo, setPseudo] = useState<string>("");
  const [dailyRuns, setDailyRuns] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<number>(0);
  const [informationsModification, setInformationsModification] =
    useState<boolean>(false);
  const [userProjects, setUserProjects] = useState<IProjectsListing[]>();
  const [supportedProjects, setSupportedProject] =
    useState<IProjectsListing[]>();
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [userProjectsMore, setUserProjectsMore] = useState<boolean>(false);
  const [supportedProjectsMore, setSupportedProjectsMore] =
    useState<boolean>(false);

  useQuery(GET_ONE_USER, {
    variables: { getOneUserId: localStorage.getItem("uuid") },
    onCompleted(data: { getOneUser: IUser }) {
      setName("Jean-Claude");
      setMail(data.getOneUser.email);
      setIsPremium(data.getOneUser.premium);
      setPseudo(data.getOneUser.pseudo);
      setDailyRuns(data.getOneUser.dailyRuns);
    },
  });

  useQuery(GET_USER_PROJECTS, {
    variables: { userId: localStorage.getItem("uuid") },
    onCompleted(data: { getProjectsByUserId: IProjectsListing[] }) {
      setUserProjects(data.getProjectsByUserId);
    },
  });

  useQuery(GET_PROJECTS_SUPPORTED, {
    variables: { userId: localStorage.getItem("uuid") },
    onCompleted(data: { getProjectsSupported: IProjectsListing[] }) {
      setSupportedProject(data.getProjectsSupported);
    },
  });

  useQuery(GET_USER_LIKES, {
    variables: { userId: localStorage.getItem("uuid") },
    onCompleted(data: { getAllLikesByUser: ILike[] }) {
      setLikes(data.getAllLikesByUser.length);
    },
  });

  useQuery(GET_USER_COMMENTS, {
    variables: { userId: localStorage.getItem("uuid") },
    onCompleted(data: { getAllCommentsByUser: Comment[] }) {
      setComments(data.getAllCommentsByUser.length);
    },
  });

  const [modifyUser] = useMutation(MODIFY_USER);

  const handleClickModify = () => {
    if (informationsModification) {
      modifyUser({
        variables: {
          modifyUserId: localStorage.getItem("uuid"),
          email: mail,
          password,
          pseudo,
        },
      });
    }
    setInformationsModification(!informationsModification);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const handleChangePseudo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPseudo(e.target.value);
  };

  const graduationColor = [
    { min: 0, max: 20, color: "from-green-800 via-green-600 to-green-400" },
    { min: 21, max: 40, color: "from-lime-800 via-lime-600 to-lime-400" },
    { min: 41, max: 60, color: "from-yellow-800 via-yellow-600 to-yellow-400" },
    { min: 61, max: 80, color: "from-orange-800 via-orange-600 to-orange-400" },
    { min: 81, max: 100, color: "from-red-800 via-red-600 to-red-400" },
  ];

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
                  className="w-full rounded-sm p-1 pl-2 font-bold text-black"
                  value={name}
                  autoComplete={name}
                  onChange={(e) => {
                    handleChangeName(e);
                  }}
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
                  className="w-full rounded-sm p-1 pl-2 font-bold text-black"
                  type="email"
                  value={mail}
                  onChange={(e) => {
                    handleChangeEmail(e);
                  }}
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
                  className="w-full rounded-sm p-1 pl-2 font-bold text-black"
                  value={pseudo}
                  autoComplete={pseudo}
                  onChange={(e) => {
                    handleChangePseudo(e);
                  }}
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
                  className="w-full rounded-sm p-1 pl-2 font-bold text-black"
                  value={password}
                  autoComplete={password}
                  onChange={(e) => {
                    handleChangePassword(e);
                  }}
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
        {!userProjectsMore && userProjects && userProjects.length > 0 ? (
          <ProjectsListing
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
            <ProjectsListing
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
          {userProjects && userProjects.length > 0 ? (
            <img
              role="presentation"
              src={`/assets/arrow-${!userProjectsMore ? "down" : "up"}.svg`}
              alt="arrowDown"
              className="w-14 h-14 p-2 border-2 border-white m-8 rounded-full cursor-pointer"
              onClick={() => setUserProjectsMore(!userProjectsMore)}
            />
          ) : (
            <div className="my-32 flex flex-col justify-center items-center gap-4">
              <p>No project created yet...</p>
              <NavLink to="/editor">
                <Button
                  type="submit"
                  gradientDuoTone="cyanToBlue"
                  className="m-auto"
                >
                  LET&nbsp;S CODE
                </Button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-aldrich text-3xl">Projects supported :</h1>
        {!supportedProjectsMore &&
        supportedProjects &&
        supportedProjects.length > 0 ? (
          <ProjectsListing
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
            <ProjectsListing
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
          {supportedProjects && supportedProjects.length > 0 ? (
            <img
              role="presentation"
              src={`/assets/arrow-${
                !supportedProjectsMore ? "down" : "up"
              }.svg`}
              alt="arrowDown"
              className="w-14 h-14 p-2 border-2 border-white m-8 rounded-full cursor-pointer"
              onClick={() => setSupportedProjectsMore(!supportedProjectsMore)}
            />
          ) : (
            <div className="my-32 flex flex-col justify-center items-center gap-4">
              <p>No project supported yet...</p>
              <NavLink to="/shares">
                <Button
                  type="submit"
                  gradientDuoTone="cyanToBlue"
                  className="m-auto"
                >
                  BEST SHARES
                </Button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-aldrich text-3xl">My account access :</h1>
        <div className="flex items-center gap-2">
          <p
            className={
              isPremium
                ? "bg-gradient-to-r bg-clip-text text-transparent from-orange-800 via-orange-500 to-yellow-600 animate-premiumColorChanging text-xl font-bold"
                : "text-lime-700 text-xl font-bold"
            }
          >
            ● {!isPremium ? "Free" : "Premium"} account
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p>Number of runs today</p>
          {!isPremium ? (
            <div className="flex items-center w-full bg-white rounded-sm h-6">
              <p
                className={`font-bold text-black flex justify-center bg-gradient-to-r animate-premiumColorChanging${
                  graduationColor[
                    graduationColor.findIndex(
                      (el) =>
                        el.min <= (dailyRuns / 50) * 100 &&
                        el.max >= (dailyRuns / 50) * 100,
                    )
                  ].color
                }`}
                style={{ width: `${(dailyRuns / 50) * 100}%` }}
              >
                {dailyRuns > 0 && dailyRuns}
              </p>
              <p
                className="font-bold text-black flex justify-center"
                style={{ width: `${((50 - dailyRuns) / 50) * 100}%` }}
              >
                {50 - dailyRuns > 0 && 50 - dailyRuns}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full rounded-sm h-6 font-bold text-black bg-gradient-to-r from-green-800 via-green-600 to-green-400 animate-premiumColorChanging">
              {dailyRuns} / ∞
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p>Number of likes this month</p>
          {!isPremium ? (
            <div className="flex items-center justify-center w-full bg-white rounded-sm h-6">
              <p
                className={`font-bold text-black flex justify-center bg-gradient-to-r animate-premiumColorChanging ${
                  graduationColor[
                    graduationColor.findIndex(
                      (el) =>
                        el.min <= (likes / 5) * 100 &&
                        el.max >= (likes / 5) * 100,
                    )
                  ].color
                }`}
                style={{ width: `${(likes / 5) * 100}%` }}
              >
                {likes > 0 && likes}
              </p>
              <p
                className="font-bold text-black flex justify-center"
                style={{ width: `${((5 - likes) / 5) * 100}%` }}
              >
                {5 - likes > 0 && 5 - likes}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full rounded-sm h-6 font-bold text-black bg-gradient-to-r from-green-800 via-green-600 to-green-400 animate-premiumColorChanging">
              {likes} / ∞
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p>Number commentaries this month</p>
          {!isPremium ? (
            <div className="flex items-center justify-center w-full bg-white rounded-sm h-6">
              <p
                className={`font-bold text-black flex justify-center bg-gradient-to-r animate-premiumColorChanging ${
                  graduationColor[
                    graduationColor.findIndex(
                      (el) =>
                        el.min <= (comments / 5) * 100 &&
                        el.max >= (comments / 5) * 100,
                    )
                  ].color
                }`}
                style={{ width: `${(comments / 5) * 100}%` }}
              >
                {comments > 0 && comments}
              </p>
              <p
                className="font-bold text-black flex justify-center"
                style={{ width: `${((5 - comments) / 5) * 100}%` }}
              >
                {5 - comments > 0 && 5 - comments}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full rounded-sm h-6 font-bold text-black bg-gradient-to-r from-green-800 via-green-600 to-green-400 animate-premiumColorChanging">
              {comments} / ∞
            </div>
          )}
        </div>
        {!isPremium && (
          <NavLink className="mx-auto mt-14 w-1/5" to="/premium">
            <Button
              type="submit"
              gradientDuoTone="pinkToOrange"
              className="m-auto"
            >
              GET YOUR PREMIUM ACCESS NOW
            </Button>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default UserSpaceContainer;
