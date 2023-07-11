export const mockCharacters = {
  characters: [
    {
      combatStatus: false,
      weapon: "String",
      id: "qHRKCxhXD4Qaa1n6hwZadN",
      description: "244",
      name: "Doflamingo",
    },
    {
      combatStatus: false,
      description: "244",
      name: "Cruz",
      weapon: "Mace",
      id: "qHRKCxhXD4Qaa223hwZadN",
    },
    {
      combatStatus: false,
      weapon: "Sling",
      id: "iR9sa7zXaUkJwiPH5vUkwt",
      description: "Bawal",
      name: "koy",
    },
    {
      combatStatus: false,
      weapon: "Bow and Arrow",
      id: "iR9sa7zXaUkJwiPH5vUkwt",
      description: "Black car",
      name: "Black",
    },
  ],
};

export const mockWeapons = {
  weapons: [
    "Knife",
    "Sword",
    "Dagger",
    "Bow and Arrow",
    "Sling",
    "Club",
    "Spear",
    "Staff",
    "Throwing Axe",
    "Mace",
    "Whip",
  ],
};

export const mockQueryReturn = (data: any) => {
  return {
    status: "success",
    isLoading: false,
    isSuccess: true,
    isError: false,
    isIdle: false,
    data,
    dataUpdatedAt: 1689077692113,
    error: null,
    errorUpdatedAt: 0,
    failureCount: 0,
    errorUpdateCount: 0,
    isFetched: true,
    isFetchedAfterMount: true,
    isFetching: true,
    isRefetching: true,
    isLoadingError: false,
    isPlaceholderData: false,
    isPreviousData: false,
    isRefetchError: false,
    isStale: true,
  };
};

export const mockQueryReturnFail = {
  status: "error",
  isLoading: false,
  isSuccess: false,
  isError: true,
  isIdle: false,
  dataUpdatedAt: 0,
  error: {
    message: "Failed to fetch",
    stack: `"TypeError: Failed to fetch
    at Object.getCharacters [as queryFn] (webpack-internal:///(app-client)/./src/app/Homepage/helper.ts:21:28)
    at Object.fetchFn [as fn] (webpack-internal:///(app-client)/./node_modules/react-query/es/core/query.js:309:29)
    at run (webpack-internal:///(app-client)/./node_modules/react-query/es/core/retryer.js:105:31)
    at eval (webpack-internal:///(app-client)/./node_modules/react-query/es/core/retryer.js:159:11)"`,
  },
  errorUpdatedAt: 1689083100808,
  failureCount: 4,
  errorUpdateCount: 1,
  isFetched: true,
  isFetchedAfterMount: true,
  isFetching: false,
  isRefetching: false,
  isLoadingError: true,
  isPlaceholderData: false,
  isPreviousData: false,
  isRefetchError: false,
  isStale: true,
};
