import { BASE_URL } from "../../shared/constants";
import { ICourse } from "../types";
import { PaginationMetadata } from "../types/archive";

export interface FetchCoursesResponse {
  data: ICourse[];
  pagination: PaginationMetadata | null;
}

export interface CourseQueryParams {
  pageNumber?: number;
  pageSize?: number;
  name?: string;
  searchQuery?: string;
  startDate?: string;
  endDate?: string;
}

export async function fetchCoursesPaged(
  token: string,
  params: CourseQueryParams
): Promise<FetchCoursesResponse> {

    const query = new URLSearchParams();

  if (params.pageNumber) query.append("PageNumber", params.pageNumber.toString());
  if (params.pageSize) query.append("PageSize", params.pageSize.toString());
  if (params.name) query.append("Name", params.name);
  if (params.searchQuery) query.append("SearchQuery", params.searchQuery);
  if (params.startDate) query.append("StartDate", params.startDate);
  if (params.endDate) query.append("EndDate", params.endDate);

  const url = `${BASE_URL}/courses/archive?${query.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }});

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  const paginationHeader = res.headers.get("X-Pagination");
  const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;

  const camelPagination = pagination
  ? {
      totalCount: pagination.TotalCount,
      currentPage: pagination.CurrentPage,
      pageSize: pagination.PageSize,
      totalPages: pagination.TotalPages,
      hasNext: pagination.HasNext,
      hasPrevious: pagination.HasPrevious,
    }
  : null;

  if (res.status === 204) {
    return { data: [], pagination };
  }

  const data = await res.json();
  return { data, pagination: camelPagination };
}