import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ChatBubbleLeftIcon, HeartIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import IUser from "../interfaces/IUser";
import ILike from "../interfaces/ILike";
import IComment from "../interfaces/IComment";
import useLoggedUser from "../hooks/useLoggedUser";
import AlertContext from "../contexts/AlertContext";

// TODO delete this const
const post = {
  id: 1,
  title: "Boost your conversion rate",
  href: "#",
  description:
    "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel iusto corrupti dicta laboris incididunt.",
  imageUrl:
    "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
  date: "Mar 16, 2020",
  datetime: "2020-03-16",
  category: { title: "Marketing", href: "#" },
  author: {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ADD_LIKE = gql`
  mutation Mutation($idProject: Float!) {
    addLike(idProject: $idProject)
  }
`;

const DELETE_LIKE = gql`
  mutation DeleteLike($idProject: Float!) {
    deleteLike(idProject: $idProject)
  }
`;
export interface IBestSharesProject {
  id: number;
  name: string;
  description: string;
  updatedAt: Date;
  user: IUser;
  likes: ILike[];
  comments: IComment[];
  isUserProject?: boolean;
  isPublic: boolean;
  createdAt: Date;
}
interface ProjectsListingProps {
  project: IBestSharesProject;
}

function ProjectsListing({ project }: ProjectsListingProps) {
  const { user: loggedUser } = useLoggedUser();
  const { id, description, user, likes, comments, createdAt } = project;

  const { showAlert } = useContext(AlertContext);

  const datetime = new Date(createdAt);
  const date = datetime.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const [isLikedByLoggedUser, setIsLikedByLoggedUser] = useState<boolean>(
    likes.some((like) => like.user.id === loggedUser.id),
  );
  const [counter, setCounter] = useState({
    likes: likes.length,
    comments: comments.length,
  });

  const navigate = useNavigate();

  const [addLike] = useMutation(ADD_LIKE, {
    variables: {
      idProject: Number(id),
    },
  });

  const [deleteLike] = useMutation(DELETE_LIKE, {
    variables: {
      idProject: Number(id),
    },
  });

  const handleLike = () => {
    if (loggedUser.id === undefined) {
      showAlert(
        "Please login or register to interract with projects :)",
        "warning",
      );
    } else if (project.user.id === loggedUser.id) {
      showAlert("You can't like your own project :)", "warning");
    } else {
      if (!isLikedByLoggedUser) {
        addLike();
        setCounter({ ...counter, likes: counter.likes + 1 });
      } else {
        deleteLike();
        setCounter({ ...counter, likes: counter.likes - 1 });
      }
      setIsLikedByLoggedUser(!isLikedByLoggedUser);
    }
  };

  const handleClickComment = (idClicked: number) => {
    if (loggedUser.id === undefined) {
      showAlert(
        "Please login or register to interract with projects :)",
        "info",
      );
    } else {
      navigate(`/project-details/${idClicked}`);
    }
  };

  return (
    <div className="bg-slate-100 py-6 sm:py-8 w-2/3 rounded-2xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className="mt-8 space-y-20 lg:space-y-20">
            <article
              key={project.id}
              className="relative isolate flex flex-col gap-8 lg:flex-row"
            >
              <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={String(datetime)} className="text-gray-500">
                    {date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    Javascript
                  </a>
                </div>
                <div className="group relative max-w-xl">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={`/project-details/${project.id}`}>
                      <span className="absolute inset-0" />
                      {project.name}
                    </a>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600">
                    {description}
                  </p>
                </div>
                <div className="mt-6 flex border-t border-gray-900/5 pt-6 justify-between gap-x-12">
                  <div className="relative flex items-center gap-x-4">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                      alt=""
                      className="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <span className="absolute inset-0" />
                        {user.pseudo}
                      </p>
                      <p className="text-gray-600">
                        {user.premium ? "Premium Account" : "Free Account"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-x-3">
                    <button
                      type="button"
                      className={classNames(
                        isLikedByLoggedUser
                          ? "font-semibold text-gray-900"
                          : "text-gray-600",
                        "flex items-center gap-x-1",
                      )}
                      onClick={handleLike}
                    >
                      <HeartIcon
                        className={classNames(
                          isLikedByLoggedUser ? "text-red-600" : "",
                          "w-5 h-5",
                        )}
                      />
                      {counter.likes} Like{counter.likes > 1 ? "s" : ""}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClickComment(id)}
                      className="text-gray-600 flex items-center gap-x-1"
                    >
                      <ChatBubbleLeftIcon className="w-5 h-5" />
                      {counter.comments} Comment
                      {counter.comments > 1 ? "s" : ""}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsListing;
