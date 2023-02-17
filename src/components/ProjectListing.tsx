import { gql, useMutation } from "@apollo/client";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

const MODIFY_PROJECT_PRIVACY = gql`
  mutation Mutation($modifyProjectId: Float!, $public: Boolean) {
    modifyProject(id: $modifyProjectId, public: $public)
  }
`;

function ProjectsListing({
  id,
  name,
  description,
  updatedAt,
  user,
  likes,
  comments,
  isPublic,
  isUserProject = false,
}: IProjectsListing) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isPublicProject, setIsPublicProject] = useState<boolean>(isPublic);

  const navigate = useNavigate();

  const [likesCount, setLikesCount] = useState<number>(0);

  useEffect(() => {
    if (likes) {
      setIsLiked(
        likes.filter((el) => el.user.id === localStorage.getItem("uuid"))
          .length >= 1,
      );
      setLikesCount(likes.length);
    }
  }, [likes]);

  const [addLike] = useMutation(ADD_LIKE, {
    onCompleted() {
      setIsLiked(true);
    },
  });

  const [changePrivacy] = useMutation(MODIFY_PROJECT_PRIVACY, {
    onCompleted() {
      setIsPublicProject(!isPublicProject);
    },
  });

  const handleChangePrivacy = () => {
    changePrivacy({
      variables: {
        modifyProjectId: Number(id),
        public: !isPublicProject,
      },
    });
  };

  const [deleteLike] = useMutation(DELETE_LIKE, {
    onCompleted() {
      setIsLiked(false);
    },
  });

  const handleClickHeart = () => {
    if (localStorage.getItem("uuid") != null) {
      if (user.id !== localStorage.getItem("uuid")) {
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
        alert("This is your project, you can't add like on it"); // eslint-disable-line no-alert
      }
    } else {
      alert("Please login or register to interract with projects :)"); // eslint-disable-line no-alert
    }
  };

  const handleClickComment = (idClicked: number) => {
    if (localStorage.getItem("uuid") != null) {
      navigate(`/project-details/${idClicked}`);
    } else {
      alert("Please login or register to interract with projects :)"); // eslint-disable-line no-alert
    }
  };

  return (
    <div className="flex flex-row justify-start items-center gap-10 w-full h-fit mb-8">
      <div className="flex flex-col justify-start items-center gap-2 w-1/2">
        <div className="flex flex-row justify-between items-center w-full">
          <h1
            className={
              isUserProject
                ? "text-3xl font-aldrich underline"
                : user.id === localStorage.getItem("uuid")
                ? "text-lime-600  text-3xl font-aldrich "
                : user.premium
                ? "bg-gradient-to-r bg-clip-text text-transparent from-orange-800 via-orange-500 to-yellow-600 animate-premiumColorChanging text-3xl font-aldrich "
                : "text-3xl font-aldrich "
            }
          >
            {isUserProject ? name : user.pseudo}
          </h1>
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
                onClick={() => handleClickComment(id)}
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
        {!isUserProject ? (
          <h1 className="text-3xl underline font-barlow font-semibold">
            {`${name.split("")[0].toUpperCase()}${name
              .split("")
              .filter((el, index) => index !== 0)
              .join("")}`}
          </h1>
        ) : isPublicProject ? (
          <div className="flex w-full justify-end items-center gap-3">
            <h1 className="font-bold text-lime-600">Public</h1>
            <img
              alt="switchOn"
              src="/assets/toggle-on.svg"
              className="h-6 w-8 cursor-pointer"
              onClick={() => handleChangePrivacy()}
              role="presentation"
            />
          </div>
        ) : (
          isUserProject &&
          !isPublicProject && (
            <div className="flex w-full justify-end items-center gap-3">
              <h1 className="font-bold text-red-600">Private</h1>
              <img
                alt="switchOn"
                src="/assets/toggle-off.svg"
                className="h-6 w-8 cursor-pointer"
                onClick={() => handleChangePrivacy()}
                role="presentation"
              />
            </div>
          )
        )}
        <p>
          {`${updatedAt
            .toString()
            .split("T")[0]
            .split("-")
            .reverse()
            .join("/")} at ${updatedAt.toString().split("T")[1].split(".")[0]}`}
        </p>
        <p className="h-[150px] text-base font-medium font-barlow max-h-[150px]">
          {description.length > 400
            ? `${description.split("").splice(0, 400).join("")}............`
            : description}
        </p>
        <div className="flex items-center justify-between mx-8">
          <h1 className="bg-yellow-200 text-black px-2 rounded-sm font-bold">
            Javascript
          </h1>
          {localStorage.getItem("uuid") !== null ? (
            <NavLink to={`/project-details/${id}`}>
              <Button
                type="submit"
                gradientDuoTone="cyanToBlue"
                className="m-auto"
              >
                ACCESS THE PROJECT
              </Button>
            </NavLink>
          ) : (
            <Button
              type="submit"
              gradientDuoTone="cyanToBlue"
              disabled
              className="m-auto"
            >
              ACCESS THE PROJECT
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectsListing;
