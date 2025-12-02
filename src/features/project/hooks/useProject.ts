import { useEffect } from "react";
import { VERSION } from "enums";
import { useIsBrandedPageFlag } from "helpers/hooks/useIsBrandedPageFlag";
import { Project } from "models/project";
import { LOADERS, useProjectStore, useUiStore } from "state/stores";
import { useQuery } from "@apollo/client/react";
import { ProjectVariables } from "../api/queries/models";
import { GET_PROJECT } from "../api/queries/queries";

export const useProjectState = (projectId: string) => {
  const isBrandedPage = useIsBrandedPageFlag();
  const { loading, data } = useQuery<{ project: Project }, ProjectVariables>(GET_PROJECT, {
    fetchPolicy: "cache-first",
    context: {
      headers: {
        "x-api-client-name": "booking-page",
      },
      version: VERSION.V1,
    },
    variables: {
      projectId: projectId ?? "",
    },
    skip: !projectId || !isBrandedPage,
  });

  const setProject = useProjectStore((state) => state.setProject);
  const setLoader = useUiStore((state) => state.setLoader);

  useEffect(() => {
    if (data) {
      const { project } = data;
      setProject({ ...project });
    }
  }, [data, setProject]);

  useEffect(() => {
    setLoader(LOADERS.PROJECT, loading);
  }, [loading, setLoader]);
};
