import { ReactElement, useEffect, useState } from "react";
import { PaginationMetadata } from "../types/archive";
import { ICourse } from "../types";
import { fetchCoursesPaged } from "../api/archive";
import { useAdminContext } from "../context";
import { CourseListItem } from "../../shared/components/CourseList/CourseListItem";
import "../css/archive.css";

export function CourseArchive(): ReactElement {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [pagination, setPagination] = useState<PaginationMetadata | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAdminContext();

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchCoursesPaged(token!, {
        pageNumber,
        pageSize,
        name,
        searchQuery,
        startDate,
        endDate,
      });

      setCourses(result.data);
      setPagination(result.pagination);
    } catch (err: any) {
      console.error("Error fetching courses:", err);
      setError(err.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [pageNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPageNumber(1);
    fetchCourses();
  };

  return (
    <main className="form-page archive">
      <div className="archive-page">
        <form className="form" onSubmit={handleSubmit}>
          <fieldset>
            <label>Course Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div style={{ marginTop: 10 }}>
              <label>Search:</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <label>Finished between:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <label></label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 10 }}>
              <label>Page Size:</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
              </select>
            </div>

            <button type="submit" style={{ marginTop: 10 }}>
              Find Courses
            </button>

            <button
              type="button"
              onClick={() => {
                setName("");
                setSearchQuery("");
                setStartDate("");
                setEndDate("");
                setPageNumber(1);
                setCourses([]);
                setPagination(null);
              }}
            >
              Cancel
            </button>
          </fieldset>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      

        <div className="search-result">
          <ul className="course-list">
            {courses.map((course: ICourse) => (
              <CourseListItem key={course.id} course={course} />
            ))}
          </ul>
          {pagination && pagination.totalCount == 0  && (<p style={{ color: "red" }}>No courses found!</p>)}

          {pagination && (
            <div style={{ marginTop: 20 }}>
              <p>
                Page {pagination.currentPage} of {pagination.totalPages} —
                Courses: {pagination.totalCount}
              </p>
              
              <button
                onClick={() => setPageNumber(pageNumber - 1)}
                disabled={!pagination.hasPrevious}
              >
               <span className="material-symbols-outlined" >chevron_left</span>
              </button>
              <button
                onClick={() => setPageNumber(pageNumber + 1)}
                disabled={!pagination.hasNext}
                style={{ marginLeft: 10 }}
              >
                <span className="material-symbols-outlined" >chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
