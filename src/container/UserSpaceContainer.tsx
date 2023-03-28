import { gql, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { Button } from "flowbite-react";
import { NavLink } from "react-router-dom";

import IUser from "../interfaces/IUser";
import ILike from "../interfaces/ILike";
import { UserContext } from "../contexts/UserContext";

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

const GET_USER_LIKES = gql`
  query Query {
    getAllLikesByUser {
      id
    }
  }
`;

const GET_USER_COMMENTS = gql`
  query GetAllCommentsByUser {
    getAllCommentsByUser {
      id
    }
  }
`;

function UserSpaceContainer() {
  document.title = "Codeless4 | My Account";
  const { user } = useContext(UserContext);

  const [dailyRuns, setDailyRuns] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<number>(0);

  const [isPremium, setIsPremium] = useState<boolean>(false);

  useQuery(GET_ONE_USER, {
    variables: { getOneUserId: user?.id },
    onCompleted(data: { getOneUser: IUser }) {
      setIsPremium(data.getOneUser.premium);
      setDailyRuns(data.getOneUser.dailyRuns);
    },
  });

  useQuery(GET_USER_LIKES, {
    onCompleted(data: { getAllLikesByUser: ILike[] }) {
      setLikes(data.getAllLikesByUser.length);
    },
  });

  useQuery(GET_USER_COMMENTS, {
    onCompleted(data: { getAllCommentsByUser: Comment[] }) {
      setComments(data.getAllCommentsByUser.length);
    },
  });

  const graduationColor = [
    { min: 0, max: 20, color: "from-green-800 via-green-600 to-green-400" },
    { min: 21, max: 40, color: "from-lime-800 via-lime-600 to-lime-400" },
    { min: 41, max: 60, color: "from-yellow-800 via-yellow-600 to-yellow-400" },
    { min: 61, max: 80, color: "from-orange-800 via-orange-600 to-orange-400" },
    { min: 81, max: 100, color: "from-red-800 via-red-600 to-red-400" },
  ];

  return (
    <div className="flex flex-col h-full gap-16 mx-32 my-10">
      <span className="bg-black w-full h-20" />

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
