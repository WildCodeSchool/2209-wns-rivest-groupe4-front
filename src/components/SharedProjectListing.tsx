import { gql, useMutation } from "@apollo/client";
import { Button } from "flowbite-react";
import { useState } from "react";
import IProjectsListing from "../interfaces/IProjectsListing";

const ADD_LIKE = gql`
  mutation Mutation($idProject: Float!, $idUser: String!) {
    addLike(idProject: $idProject, idUser: $idUser)
  }
`;

const DELETE_LIKE = gql`
  mutation DeleteLike($idProject: Float!, $idUser: String!) {
    deleteLike(idProject: $idProject, idUser: $idUser)
  }
`;

function SharedProjectsListing({
  id,
  name,
  description,
  updatedAt,
  user,
  likes,
  comments,
}: IProjectsListing) {
  const [isLiked, setIsLiked] = useState<boolean>(
    likes.filter((el) => el.user.id === localStorage.getItem("uuid")).length >=
      1,
  );

  const [likesCount, setLikesCount] = useState<number>(likes.length);

  const [addLike] = useMutation(ADD_LIKE, {
    onCompleted() {
      setIsLiked(true);
    },
  });

  const [deleteLike] = useMutation(DELETE_LIKE, {
    onCompleted() {
      setIsLiked(false);
    },
  });

  const handleClickHeart = () => {
    if (localStorage.getItem("uuid") != null) {
      if (isLiked) {
        deleteLike({
          variables: {
            idProject: Number(id),
            idUser: localStorage.getItem("uuid"),
          },
        });
        setIsLiked(false);
        setLikesCount(likesCount - 1);
      } else {
        addLike({
          variables: {
            idProject: Number(id),
            idUser: localStorage.getItem("uuid"),
          },
        });
        setIsLiked(true);
        setLikesCount(likesCount + 1);
      }
    } else {
      alert("Please login or register to interract with projects :)"); // eslint-disable-line no-alert
    }
  };

  const handleClickComment = () => {
    if (localStorage.getItem("uuid") != null) {
      console.warn("redirect detail");
    } else {
      alert("Please login or register to interract with projects :)"); // eslint-disable-line no-alert
    }
  };

  return (
    <div className="flex flex-row justify-start items-center gap-10 w-full h-fit">
      <div className="flex flex-col justify-start items-center gap-2 w-1/2">
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="text-3xl font-aldrich">{user.pseudo}</h1>
          <div className="flex gap-16 mx-4">
            <div className="flex gap-2 items-center">
              <p>{likesCount}</p>
              <img
                role="presentation"
                onClick={() => handleClickHeart()}
                alt="heart"
                className="cursor-pointer"
                src={`assets/heart-solid-${isLiked ? "red" : "white"}.svg`}
              />
            </div>
            <div className="flex gap-2">
              <p>{comments.length}</p>
              <img
                role="presentation"
                onClick={() => handleClickComment()}
                alt="comment"
                className="cursor-pointer"
                src="assets/comment-solid.svg"
              />
            </div>
          </div>
        </div>
        <img className="h-[300px] w-full" alt="img" src="assets/code.jpg" />
      </div>
      <div className="flex flex-col justify-start w-1/2 gap-5 h-full p-6">
        <h1 className="text-3xl underline font-barlow font-semibold">
          {`${name.split("")[0].toUpperCase()}${name
            .split("")
            .filter((el, index) => index !== 0)
            .join("")}`}
        </h1>
        <p>
          {`${updatedAt
            .toString()
            .split("T")[0]
            .split("-")
            .reverse()
            .join("/")} at ${updatedAt.toString().split("T")[1].split(".")[0]}`}
        </p>
        <p className="h-[150px]">{description}</p>
        <div className="flex items-center justify-center ml-20">
          <h1 className="bg-yellow-200 text-black px-2 rounded-sm font-bold">
            Javascript
          </h1>
          <Button
            type="submit"
            disabled={localStorage.getItem("uuid") === null}
            gradientDuoTone="cyanToBlue"
            className="m-auto"
          >
            ACCESS THE PROJECT
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SharedProjectsListing;
