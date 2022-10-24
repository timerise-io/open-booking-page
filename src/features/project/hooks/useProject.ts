import { useQuery } from "@apollo/client";
import { useIsBrandedPageFlag } from "helpers/hooks/useIsBrandedPageFlag";
import { Project } from "models/project";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { loaderAtom, LOADERS } from "state/atoms/loader";
import { projectAtom } from "state/atoms/project";
import { ProjectVariables } from "../api/queries/models";
import { GET_PROJECT } from "../api/queries/queries";

export const useProjectState = (projectId: string) => {
  const isBrandedPage = useIsBrandedPageFlag();
  const { loading, data } = useQuery<{ project: Project }, ProjectVariables>(
    GET_PROJECT,
    {
      context: {
        headers: {
          "x-api-client-name": "booking-page",
        },
      },
      variables: {
        projectId: projectId ?? "",
      },
      skip: !projectId || !isBrandedPage,
    }
  );

  const setProject = useSetRecoilState(projectAtom);
  const setProjectLoader = useSetRecoilState(loaderAtom(LOADERS.PROJECT));

  useEffect(() => {
    if (data) {
      const { project } = data;
      setProject({ ...project });
    }
  }, [data, setProject]);

  useEffect(() => {
    setProjectLoader(loading);
  }, [loading, setProjectLoader]);
};
