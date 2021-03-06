import { gql, useGQLInfiniteQuery } from "graph";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AsyncSelect,
  AsyncSelectProps,
  OptionValue,
} from "../components/AsyncSelect";

export const useProjectsBase = () => {
  const { hasNextPage, fetchNextPage, isFetching, data, isLoading } =
    useGQLInfiniteQuery(
      gql(/* GraphQL */ `
        query AllProjectsBase($pagination: CursorConnectionArgs!) {
          adminProjects {
            allProjects(pagination: $pagination) {
              nodes {
                id
                code
                label
              }
              ...Pagination
            }
          }
        }
      `),
      (after) => {
        return {
          pagination: {
            first: 50,
            after,
          },
        };
      },
      {
        getNextPageParam({
          adminProjects: {
            allProjects: {
              pageInfo: { hasNextPage, endCursor },
            },
          },
        }) {
          return hasNextPage ? endCursor : null;
        },
        staleTime: 5000,
      }
    );

  useEffect(() => {
    if (isFetching) return;

    if (hasNextPage) {
      fetchNextPage().catch(console.error);
    }
  }, [hasNextPage, fetchNextPage, isFetching]);

  const projects = useMemo(() => {
    const projects: Record<
      string,
      {
        id: string;
        code: string;
        label: string;
      }
    > = {};

    for (const project of data?.pages.flatMap(
      (v) => v.adminProjects.allProjects.nodes
    ) || []) {
      projects[project.id] = project;
    }

    return Object.values(projects);
  }, [data]);

  const asOptions = useMemo(() => {
    return projects.map(({ id, label, code }) => {
      return {
        label: projectOptionLabel({ label, code }),
        value: id,
      };
    });
  }, [projects]);

  const filteredOptions = useCallback(
    async (input: string) => {
      return input
        ? asOptions.filter((v) => v.label.includes(input))
        : asOptions;
    },
    [asOptions]
  );

  return {
    projects,
    isFetching,
    isLoading,
    asOptions,
    filteredOptions,
  };
};

export const projectOptionLabel = ({
  code,
  label,
}: {
  code: string;
  label: string;
}) => `${code} | ${label}`;

export const useSelectSingleProject = ({
  state,
}: {
  state?: [OptionValue | null, (value: OptionValue | null) => void];
} = {}) => {
  const { isFetching, isLoading, filteredOptions, asOptions } =
    useProjectsBase();

  const [selectedProject, setSelectedProject] =
    state || useState<OptionValue | null>(null);

  const selectSingleProjectComponent = useMemo(() => {
    return (
      <AsyncSelect
        key={isLoading ? -1 : asOptions.length}
        isLoading={isFetching}
        loadOptions={filteredOptions}
        onChange={(selected) => {
          setSelectedProject(selected || null);
        }}
        value={selectedProject}
        placeholder="Search a project"
      />
    );
  }, [filteredOptions, isLoading, isFetching, asOptions, selectedProject]);

  return {
    selectedProject,
    selectSingleProjectComponent,
  };
};

export const useSelectMultiProjects = ({
  state,
  selectProps,
}: {
  state?: [readonly OptionValue[], (value: OptionValue[]) => void];
  selectProps?: Partial<AsyncSelectProps>;
} = {}) => {
  const { isFetching, isLoading, filteredOptions, asOptions } =
    useProjectsBase();

  const [selectedProjects, setSelectedProjects] =
    state || useState<OptionValue[]>([]);

  const selectMultiProjectComponent = useMemo(() => {
    return (
      <AsyncSelect
        key={isLoading ? -1 : asOptions.length}
        isLoading={isFetching}
        loadOptions={filteredOptions}
        onChange={(selected) => {
          setSelectedProjects(selected || []);
        }}
        isMulti
        value={selectedProjects}
        placeholder="Search a project"
        {...selectProps}
      />
    );
  }, [filteredOptions, isLoading, isFetching, asOptions, selectedProjects]);

  return {
    selectedProjects,
    selectMultiProjectComponent,
    setSelectedProjects,
  };
};
