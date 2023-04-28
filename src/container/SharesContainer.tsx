import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { GET_SHARED_PROJECTS } from "../apollo/queries";
import ProjectsListing, {
  IBestSharesProject,
} from "../components/ProjectListing";
import BestSharesHeader, { OrderByValue } from "../BestSharesHeader";

function SharesContainer() {
  document.title = "Codeless4 | Best Shares";

  const [filters, setFilters] = useState({
    offset: 0,
    limit: 10,
    orderBy: "createdAt",
    order: "DESC",
  });

  const { data, loading, error, refetch } = useQuery(GET_SHARED_PROJECTS, {
    variables: filters,
  });

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const handleOrderBy = (value: OrderByValue) => {
    const order = value.includes("DESC") ? "DESC" : "ASC";
    const orderBy = value.replace("DESC", "").replace("ASC", "").trim();

    setFilters({
      ...filters,
      orderBy,
      order,
    });
  };

  if (loading)
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  if (error) return <p>Error :(</p>;

  return (
    <>
      <BestSharesHeader handleOrderBy={handleOrderBy} filters={filters} />
      <div className="flex flex-col h-full gap-6 mx-32 my-10">
        {data.getSharedProjects.map((project: IBestSharesProject) => (
          <ProjectsListing key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

export default SharesContainer;
