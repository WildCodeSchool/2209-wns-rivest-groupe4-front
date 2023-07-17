import { useMutation, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { Button } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import IProjectsListing from "../interfaces/IProjectsListing";
import IFolder from "../interfaces/IFolder";
import IComment from "../interfaces/IComment";
import AlertContext from "../contexts/AlertContext";
import {
  ADD_LIKE,
  DELETE_LIKE,
  ADD_COMMENT,
  MODIFY_COMMENT,
  DELETE_COMMENT,
} from "../apollo/mutations";
import {
  GET_PROJECT_BY_ID,
  GET_FOLDER_BY_IDPROJECT,
  GET_COMMENTS_BY_IDPROJECT,
  GET_USER_LIKES,
  GET_USER_COMMENTS,
  GET_PROJECTS_SUPPORTED,
} from "../apollo/queries";
import useLoggedUser from "../hooks/useLoggedUser";
import ILike from "../interfaces/ILike";

function ProjectDetailsContainer() {
  document.title = "Codeless4 | Details";

  const { idProject } = useParams<string>();
  const [projectDetails, setProjectDetails] = useState<IProjectsListing>();
  const [mainFolder, setMainFolder] = useState<IFolder>();
  const [folders, setFolders] = useState<IFolder[]>();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [commentEdition, setCommentEdition] = useState<number | null>(null);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [pageSelected, setPageSelected] = useState<number>(1);
  const [comments, setComments] = useState<IComment[]>();
  const [userComment, setUserComment] = useState("");
  const [userCommentModify, setUserCommentModify] = useState("");
  const [countUserLikes, setCountUserLikes] = useState<number>(0);
  const [countUserComments, setCountUserComments] = useState<number>(0);

  const { showAlert } = useContext(AlertContext);
  const { user, refetch } = useLoggedUser();

  const { refetch: refreshLikes } = useQuery(GET_USER_LIKES, {
    onCompleted(data: { getMonthlyLikesByUser: ILike[] }) {
      setCountUserLikes(data.getMonthlyLikesByUser.length);
    },
  });

  const { refetch: refreshComments } = useQuery(GET_USER_COMMENTS, {
    onCompleted(data: { getMonthlyCommentsByUser: Comment[] }) {
      setCountUserComments(data.getMonthlyCommentsByUser.length);
    },
  });

  const { refetch: refreshProjects } = useQuery(GET_PROJECTS_SUPPORTED, {
    variables: { userId: user?.id },
  });

  const [addLike] = useMutation(ADD_LIKE, {
    onCompleted: async () => {
      setIsLiked(true);
      refetch();
      await refreshLikes();
      await refreshProjects();
    },
  });

  const [deleteLike] = useMutation(DELETE_LIKE, {
    onCompleted: async () => {
      setIsLiked(false);
      refetch();
      await refreshLikes();
      await refreshProjects();
    },
  });

  const [addCommentary] = useMutation(ADD_COMMENT, {
    onCompleted: async (data: { addComment: IComment }) => {
      const newComment: IComment = {
        id: data.addComment?.id,
        comment: data.addComment?.comment,
        createdAt: data.addComment?.createdAt,
        project: data.addComment?.project,
        updatedAt: data.addComment?.updatedAt,
        user: data.addComment?.user,
      };
      if (comments) {
        setComments([newComment, ...comments]);
      } else {
        setComments([newComment]);
      }
      setUserComment("");
      refetch();
      await refreshComments();
      await refreshProjects();
    },
  });

  const [modifyComment] = useMutation(MODIFY_COMMENT, {
    onCompleted() {
      if (comments) {
        const newComments = [...comments];
        for (let i = 0; i < newComments?.length; i += 1) {
          if (newComments[i].id === commentEdition) {
            newComments[i] = {
              id: newComments[i].id,
              comment: userCommentModify,
              updatedAt: new Date(),
              createdAt: newComments[i].createdAt,
              project: newComments[i].project,
              user: newComments[i].user,
            };
          }
        }
        setComments(newComments.sort((a, b) => b.id - a.id));
      }
      setCommentEdition(null);
    },
  });

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onCompleted: async () => {
      await refreshComments();
    },
  });

  useQuery(GET_COMMENTS_BY_IDPROJECT, {
    variables: { getAllCommentsByProjectIdIdProject: Number(idProject) },
    onCompleted(data: { getAllCommentsByProjectId: IComment[] }) {
      const newComments = [...data.getAllCommentsByProjectId];
      setComments(newComments.sort((a, b) => b.id - a.id));
    },
  });

  useQuery(GET_FOLDER_BY_IDPROJECT, {
    variables: { idProject: Number(idProject) },
    onCompleted(data: { getAllFoldersByProjectId: IFolder[] }) {
      setFolders(
        data.getAllFoldersByProjectId
          .filter((el) => el.parentFolder != null)
          .sort((a, b) => {
            return a.id - b.id;
          }),
      );
      setMainFolder(
        data.getAllFoldersByProjectId.filter(
          (el) => el.parentFolder === null,
        )[0],
      );
    },
  });

  useQuery(GET_PROJECT_BY_ID, {
    variables: { getOneProjectId: Number(idProject) },
    onCompleted(data: { getOneProject: IProjectsListing }) {
      setProjectDetails(data.getOneProject);
      setIsLiked(
        data.getOneProject.likes.filter(
          (el) => el.user.id === localStorage.getItem("uuid"),
        ).length === 1,
      );
      setLikesCount(data.getOneProject.likes.length);
    },
  });

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const postComment = () => {
    if (user?.premium || countUserComments < 5) {
      addCommentary({
        variables: {
          idProject: Number(idProject),
          comment: userComment,
        },
      });
    } else {
      showAlert("You can't comment more than 5 projects per month", "warning");
    }
  };

  const dateFormat = (date: Date): string => {
    const diff = (Date.now() - date.getTime()) / 1000;
    const unit =
      diff / 60 / 60 / 24 / 30.44 / 12 > 1
        ? "year"
        : diff / 60 / 60 / 24 / 30.44 > 1
        ? "month"
        : diff / 60 / 60 / 24 > 1
        ? "day"
        : diff / 60 / 60 > 1
        ? "hour"
        : "minute";
    if (unit === "minute") {
      return Math.floor(diff / 60) > 1
        ? `${Math.floor(diff / 60)} minutes ago`
        : `1 minute ago`;
    }
    if (unit === "hour") {
      return Math.floor(diff / 60 / 60) > 1
        ? `${Math.floor(diff / 60 / 60)} hours ago`
        : `1 hour ago`;
    }
    if (unit === "day") {
      return Math.floor(diff / 60 / 60 / 24) > 1
        ? `${Math.floor(diff / 60 / 60 / 24)} days ago`
        : `yesterday`;
    }
    if (unit === "month") {
      return Math.floor(diff / 60 / 60 / 24 / 30.44) > 1
        ? `${Math.floor(diff / 60 / 60 / 24 / 30.44)} months ago`
        : `1 month ago`;
    }
    if (unit === "year") {
      return Math.floor(diff / 60 / 60 / 24 / 30.44 / 24) > 1
        ? `${Math.floor(diff / 60 / 60 / 24 / 30.44 / 24)} years ago`
        : `1 year ago`;
    }
    return date.toString();
  };

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment(e.target.value);
  };

  const handleClickHeart = () => {
    if (
      projectDetails &&
      projectDetails.user.id !== localStorage.getItem("uuid")
    ) {
      if (isLiked) {
        deleteLike({
          variables: {
            idProject: Number(idProject),
          },
        });
        setIsLiked(false);
        setLikesCount(likesCount - 1);
      } else if (user?.premium || countUserLikes < 5) {
        addLike({
          variables: {
            idProject: Number(idProject),
          },
        });
        setIsLiked(true);
        setLikesCount(likesCount + 1);
      } else {
        showAlert("You can't like more than 5 projects per month", "warning");
      }
    } else {
      showAlert("This is your project, you can't add like on it", "info");
    }
  };

  const handleConfirmModifyComment = (id: number) => {
    modifyComment({
      variables: {
        modifyCommentId: Number(id),
        content: userCommentModify,
      },
    });
  };

  const handleModifyComment = (id: number) => {
    setCommentEdition(id);
    if (comments && comments?.filter((el) => el.id === id).length > 0) {
      setUserCommentModify(comments?.filter((el) => el.id === id)[0].comment);
    }
  };

  const handleDeleteComment = (id: number) => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    if (confirm("Voulez-vous supprimer ce message ?")) {
      deleteComment({
        variables: {
          idComment: Number(id),
        },
        onCompleted: () => {
          refetch();
        },
      });
      if (comments) {
        const newComments = comments?.filter((el) => el.id !== id);
        setComments(newComments);
      }
    }
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserCommentModify(e.target.value);
  };

  const handlePageSelected = (position: string) => {
    if (position === "left") {
      if (pageSelected > 1) {
        setPageSelected(pageSelected - 1);
      }
    }
    if (position === "right") {
      if (comments && pageSelected < Math.floor(comments.length / 10) + 1) {
        setPageSelected(pageSelected + 1);
      }
    }
  };

  const displayProjectTree = (
    folder: IFolder[],
    padding: number,
    isMainFolder: boolean,
  ) => {
    return folder?.map((el, index) => {
      let lineBreak = isMainFolder ? 0 : padding;
      if (index > 0 && el.parentFolder !== folder[index - 1].parentFolder) {
        lineBreak += 1;
        displayProjectTree([el], lineBreak, false);
      }
      return (
        <div key={el.id}>
          <div className="flex gap-2">
            {!isMainFolder && (
              <span
                style={{
                  paddingLeft: `${lineBreak * 40}px`,
                }}
                className="pl-[40px]"
              >
                ╚&gt;
              </span>
            )}
            <div>{el.name}</div>
          </div>
          <div>
            {el.files.map((file) => {
              return (
                <div key={file.name} className="flex gap-2">
                  <span
                    style={{
                      paddingLeft: `${lineBreak * 40 + 40}px`,
                    }}
                  >
                    ╚&gt;
                  </span>
                  <div>{`${file.name}.${file.extension}`}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col justify-start h-fit gap-5 mx-32">
      <img
        role="presentation"
        alt="arrow-back"
        src="/assets/arrowLeft.svg"
        className="w-8 mt-4 cursor-pointer"
        onClick={() => {
          goBack();
        }}
      />
      <div className="flex w-fit gap-8">
        <h1 className="text-3xl font-bold font-barlow">
          {projectDetails?.name}&nbsp;by&nbsp;
          <span className="underline">{projectDetails?.user?.pseudo}</span>
        </h1>
        <div className="flex justify-center items-center gap-2">
          <p className="text-xl">{likesCount}</p>
          <img
            role="presentation"
            onClick={() => handleClickHeart()}
            alt="heart"
            className="cursor-pointer w-5"
            src={`/assets/heart-solid-${isLiked ? "red" : "white"}.svg`}
          />
        </div>
      </div>
      <p>{`${projectDetails?.updatedAt
        .toString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/")} at ${
        projectDetails?.updatedAt.toString().split("T")[1].split(".")[0]
      }`}</p>
      <p>{projectDetails?.description}</p>
      <div className="flex w-full h-64 my-10">
        <div className="flex flex-col w-1/2  gap-1">
          <h1 className="text-xl pb-2">Project:</h1>
          <div className="flex flex-col h-64 bg-[#232323] border-white border-2 p-4">
            {mainFolder && displayProjectTree([mainFolder], 0, true)}

            {folders && displayProjectTree(folders, 1, false)}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center  w-1/2 h-64">
          <Button
            onClick={() => navigate(`/editor/${idProject}`)}
            type="submit"
            gradientDuoTone="cyanToBlue"
            className="m-auto"
          >
            SHOW THE CODE
          </Button>
          <Button type="submit" gradientDuoTone="cyanToBlue" className="m-auto">
            DOWNLOAD THE PROJECT
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h1 className="text-xl pb-2">Commentaries :</h1>
        <div className="flex flex-col h-fit min-h-[150px] bg-[#232323] border-white border-2 ">
          {comments &&
            comments
              .filter(
                (el, index) => Math.floor(index / 10) === pageSelected - 1,
              )
              .map((el, index) => (
                <div
                  key={el.id}
                  className={`flex flex-col w-full pb-4 ${
                    index !== comments.length - 1 && "border-b-2 border-white"
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-2 p-4 items-center">
                      <h1
                        className={
                          el.user.id === localStorage.getItem("uuid")
                            ? "text-lime-600 font-semibold"
                            : el.user.premium
                            ? "bg-gradient-to-r bg-clip-text text-transparent from-orange-800 via-orange-500 to-yellow-600 animate-premiumColorChanging font-semibold"
                            : "font-semibold"
                        }
                      >
                        {el.user.pseudo}
                      </h1>
                      <span>-</span>
                      <h1>{dateFormat(new Date(el.createdAt))}</h1>
                      {new Date(el.createdAt).getTime() !==
                        new Date(el.updatedAt).getTime() && (
                        <p className="text-xs pt-1 text-white/60">(modified)</p>
                      )}
                    </div>
                    {el.user.id === localStorage.getItem("uuid") && (
                      <div className="flex" key={el.id}>
                        {commentEdition && commentEdition === el.id ? (
                          <img
                            role="presentation"
                            alt="validate"
                            src="/assets/check-solid.svg"
                            className="w-8 p-1 m-2 cursor-pointer"
                            onClick={() => {
                              handleConfirmModifyComment(el.id);
                            }}
                          />
                        ) : (
                          <img
                            role="presentation"
                            alt="edit"
                            src="/assets/pen-solid.svg"
                            className="w-6 p-1 m-2 cursor-pointer"
                            onClick={() => {
                              handleModifyComment(el.id);
                            }}
                          />
                        )}
                        <img
                          role="presentation"
                          alt="edit"
                          src="/assets/xmark-solid.svg"
                          className="w-6 p-1 my-1 mx-3 cursor-pointer"
                          onClick={() => {
                            handleDeleteComment(el.id);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {commentEdition && commentEdition === el.id ? (
                    <textarea
                      value={userCommentModify}
                      onChange={(e) => handleChangeComment(e)}
                      className="p-4 bg-[#232323] min-h-16 h-fit text-white"
                    >
                      {userCommentModify}
                    </textarea>
                  ) : (
                    <p className="p-4 min-h-16 h-fit">{el.comment}</p>
                  )}
                </div>
              ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 my-5">
        <span
          role="presentation"
          onClick={() => {
            handlePageSelected("left");
          }}
          className={`${
            pageSelected === 1 ? "cursor-default" : "cursor-pointer"
          }`}
        >
          &lt;
        </span>
        {comments &&
          comments.map(
            (el, index) =>
              (index === 0 || index % 10 === 0) && (
                <div
                  key={el.id}
                  role="presentation"
                  className={`${
                    pageSelected === Math.floor(index / 10) + 1
                      ? "font-bold cursor-default"
                      : "cursor-pointer"
                  }`}
                  onClick={() => {
                    setPageSelected(Math.floor(index / 10) + 1);
                  }}
                >
                  {Math.floor(index / 10) + 1}
                </div>
              ),
          )}
        <span
          role="presentation"
          onClick={() => {
            handlePageSelected("right");
          }}
          className={`${
            comments && pageSelected === Math.floor(comments.length / 10) + 1
              ? "cursor-default"
              : "cursor-pointer"
          }`}
        >
          &gt;
        </span>
      </div>

      <textarea
        value={userComment}
        onChange={(e) => {
          handleComment(e);
        }}
        className="flex flex-col h-fit min-h-[150px] bg-[#232323] border-white border-2 mb-8"
      >
        {userComment}
      </textarea>
      <div className="mb-10">
        <Button
          type="submit"
          onClick={() => {
            postComment();
          }}
          gradientDuoTone="cyanToBlue"
          className="m-auto"
        >
          SEND COMMENTARY
        </Button>
      </div>
    </div>
  );
}

export default ProjectDetailsContainer;
