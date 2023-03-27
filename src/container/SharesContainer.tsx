import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ProjectsListing from "../components/ProjectListing";
import IProjectsListing from "../interfaces/IProjectsListing";
import IOptionsSelected from "../interfaces/IOptionsSelected";

const GET_SHARED_PROJECTS = gql`
  query Query {
    getSharedProjects {
      id
      name
      description
      updatedAt
      isPublic
      user {
        id
        pseudo
        premium
      }
      likes {
        user {
          id
          pseudo
        }
      }
      comments {
        id
      }
    }
  }
`;

function SharesContainer() {
  document.title = "Codeless4 | Best Shares";

  const [projectsShared, setProjectsShared] = useState<IProjectsListing[]>([]);
  const [projectsSharedFiltered, setProjectsSharedFiltered] = useState<
    IProjectsListing[]
  >([]);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [optionsSelected, setOptionsSelected] = useState<IOptionsSelected[]>([
    { id: 1, content: "" },
    { id: 2, content: "" },
    { id: 3, content: "" },
  ]);

  const [loadData] = useLazyQuery(GET_SHARED_PROJECTS, {
    onCompleted(data) {
      setProjectsShared(data.getSharedProjects);
      setProjectsSharedFiltered(data.getSharedProjects);
    },
  });

  const sortProject = (projectList: IProjectsListing[]): IProjectsListing[] => {
    if (
      optionsSelected.filter((el) => el.content !== "" && el.id === 1).length >
      0
    ) {
      const { content } = optionsSelected.filter(
        (el) => el.content !== "" && el.id === 1,
      )[0];
      return projectList.sort((a, b) => {
        if (content === "DateLatest") {
          return (
            new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
          );
        }
        if (content === "DateEarliest") {
          return (
            new Date(a.updatedAt).valueOf() - new Date(b.updatedAt).valueOf()
          );
        }
        if (content === "MostLiked") {
          return b.likes.length - a.likes.length;
        }
        if (content === "LessLiked") {
          return a.likes.length - b.likes.length;
        }
        if (content === "MostCommented") {
          return b.comments.length - a.comments.length;
        }
        if (content === "LessCommented") {
          return a.comments.length - b.comments.length;
        }
        return 0;
      });
    }
    return projectList;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
  };

  useEffect(() => {
    setProjectsSharedFiltered(projectsShared);
    if (searchFilter !== "") {
      if (
        optionsSelected.filter((el) => el.content !== "" && el.id === 1)
          .length === 0
      ) {
        setProjectsSharedFiltered(
          projectsShared.filter(
            (el) =>
              el.description
                .toLowerCase()
                .includes(searchFilter.toLowerCase()) ||
              el.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
              el.user.pseudo.toLowerCase().includes(searchFilter.toLowerCase()),
          ),
        );
      } else {
        setProjectsSharedFiltered(
          sortProject(
            projectsShared.filter(
              (el) =>
                el.description
                  .toLowerCase()
                  .includes(searchFilter.toLowerCase()) ||
                el.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                el.user.pseudo
                  .toLowerCase()
                  .includes(searchFilter.toLowerCase()),
            ),
          ),
        );
      }
    } else {
      setProjectsSharedFiltered(
        sortProject(
          projectsShared.filter(
            (el) =>
              el.description
                .toLowerCase()
                .includes(searchFilter.toLowerCase()) ||
              el.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
              el.user.pseudo.toLowerCase().includes(searchFilter.toLowerCase()),
          ),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter, optionsSelected]);

  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number,
  ) => {
    const newOptions = [...optionsSelected];
    newOptions.filter((el) => el.id === id)[0].content = e.target.value;
    setOptionsSelected(newOptions);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  console.log(projectsSharedFiltered);
  return (
    <div className="flex flex-col h-full gap-10 mx-32 my-10">
      <div className="flex flex-row gap-40 mb-8">
        <h1 className="w-1/5 font-aldrich text-6xl">Code With The Best</h1>
        <div className="flex flex-col gap-10 w-2/3">
          <input
            className="w-full px-2 py-2 rounded text-black"
            placeholder="Search by keyword"
            value={searchFilter}
            onChange={(e) => handleSearch(e)}
          />
          <div className="flex w-full justify-between text-black">
            <select
              className="rounded"
              onChange={(e) => {
                handleSelect(e, 1);
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Order By
              </option>
              <option value="DateLatest">Date created (Latest first)</option>
              <option value="DateEarliest">
                Date created (Earliest first)
              </option>
              <option value="MostLiked">Most liked</option>
              <option value="LessLiked">Less liked</option>
              <option value="MostCommented">Most commented</option>
              <option value="LessCommented">Less commented</option>
            </select>
            <select
              className="rounded"
              defaultValue=""
              onChange={(e) => {
                handleSelect(e, 2);
              }}
            >
              <option value="" disabled>
                Select a langage
              </option>
              <option value="Javascript">Javascript</option>
              <option value="Typescript">Typescript</option>
              <option value="Ruby">Ruby</option>
              <option value="C">C</option>
              <option value="C++">C++</option>
            </select>
            <select
              className="rounded"
              defaultValue=""
              onChange={(e) => {
                handleSelect(e, 3);
              }}
            >
              <option value="" disabled>
                Select a tag
              </option>
              <option value="Algorithm">Algorithm</option>
              <option value="Date time">Date time</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Game">Game</option>
              <option value="Geometry">Geometry</option>
            </select>
          </div>
        </div>
      </div>
      {/*{projectsSharedFiltered.map((el) => (*/}
      {/*  <ProjectsListing*/}
      {/*    id={el.id}*/}
      {/*    key={`sharedProject${el.id}`}*/}
      {/*    name={el.name}*/}
      {/*    description={el.description}*/}
      {/*    updatedAt={el.updatedAt}*/}
      {/*    user={el.user}*/}
      {/*    comments={el.comments}*/}
      {/*    likes={el.likes}*/}
      {/*    isPublic={el.isPublic}*/}
      {/*  />*/}
      {/*))}*/}
    </div>
  );
}

export default SharesContainer;
