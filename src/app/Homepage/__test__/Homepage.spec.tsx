import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import * as ReactQuery from "react-query";
import {
  mockCharacters,
  mockQueryReturn,
  mockQueryReturnFail,
  mockWeapons,
} from "./helper/mockData";
import { renderHomepage } from "./helper/renderHelper";

describe("Homepage tests", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should show loading white characters is fetching", async () => {
    renderHomepage();
    // Check if loader existing
    expect(screen.findByTestId("table-loader")).toBeTruthy();
  });

  it("should show table data after fetching", async () => {
    jest.spyOn(ReactQuery, "useQuery").mockImplementation((qk) => {
      if (qk === "weapons") {
        return mockQueryReturn(mockWeapons) as ReactQuery.UseQueryResult;
      } else {
        return mockQueryReturn(mockCharacters) as ReactQuery.UseQueryResult;
      }
    });
    renderHomepage();
    // Check if the first data is existing
    expect(screen.getByText("Doflamingo")).toBeTruthy();
  });
  it("should show error message when cahracters failed fetching", () => {
    jest.spyOn(ReactQuery, "useQuery").mockImplementation((qk) => {
      if (qk === "weapons") {
        return mockQueryReturn(mockWeapons) as ReactQuery.UseQueryResult;
      } else {
        return mockQueryReturnFail as ReactQuery.UseQueryResult;
      }
    });
    renderHomepage();
    // Check if the first data is existing
    expect(screen.getByText("Something went wrong")).toBeTruthy();
  });
});
