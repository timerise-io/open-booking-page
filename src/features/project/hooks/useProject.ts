import { useEffect } from "react";
import { useIsBrandedPageFlag } from "helpers/hooks/useIsBrandedPageFlag";
import { Project } from "models/project";
import { LOADERS, useProjectStore, useUiStore } from "state/stores";
import { useQuery } from "@apollo/client/react";
import packageJson from "../../../../package.json";
import { ProjectVariables } from "../api/queries/models";
import { GET_PROJECT } from "../api/queries/queries";

export const useProjectState = (projectId: string, lang: string | null) => {
  const isBrandedPage = useIsBrandedPageFlag();
  const { loading, data } = useQuery<{ project: Project }, ProjectVariables>(GET_PROJECT, {
    fetchPolicy: "cache-first",
    context: {
      headers: {
        ...(lang && { "Accept-Language": lang }),
        "x-api-client-name": "open-booking-page",
      },
      version: packageJson.version,
    },
    variables: {
      projectId,
    },
    skip: !projectId || !isBrandedPage,
  });

  const setProject = useProjectStore((state) => state.setProject);
  const setLoader = useUiStore((state) => state.setLoader);

  useEffect(() => {
    if (data?.project) {
      setProject(data.project);
    }
  }, [data, setProject]);

  useEffect(() => {
    setLoader(LOADERS.PROJECT, loading);
  }, [loading, setLoader]);
};
