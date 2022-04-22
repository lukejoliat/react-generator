"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCourse = exports.useCourses = void 0;
const react_1 = require("react");
const courses_service_1 = require("./courses-service");
const useCourses = () => {
    const [courses, setCourses] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [isError, setIsError] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setIsLoading(true);
        (0, courses_service_1.getCourses)()
            .then(res => res.json())
            .then(data => {
            setIsLoading(false);
            setCourses(data);
        })
            .catch(e => {
            console.error(e);
            setIsError(true);
        });
    }, []);
    const createCourse = (course) => {
        (0, courses_service_1.createCourse)(course)
            .then(() => {
            setIsLoading(false);
            setCourses([...courses, course]);
        })
            .catch(e => {
            console.error(e);
            setIsError(true);
        });
    };
    const updateCourse = (course) => {
        (0, courses_service_1.updateCourse)(course)
            .then(() => {
            setIsLoading(false);
            const coursesCopy = courses.map(x => {
                if (x.id === course.id) {
                    return course;
                }
            });
            setCourses(coursesCopy);
        })
            .catch(e => {
            console.error(e);
            setIsError(true);
        });
    };
    const deleteCourse = (course) => {
        (0, courses_service_1.deleteCourse)(course)
            .then(() => {
            setIsLoading(false);
            setCourses(courses.filter(x => x.id !== undefined));
        })
            .catch(e => {
            console.error(e);
            setIsError(true);
        });
    };
    return { data: courses, isLoading, isError, createCourse, updateCourse, deleteCourse };
};
exports.useCourses = useCourses;
const useCourse = () => {
    const [course, setCourse] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [isError, setIsError] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setIsLoading(true);
        (0, courses_service_1.getCourse)()
            .then(res => res.json())
            .then(data => {
            setIsLoading(false);
            setCourse(data);
        })
            .catch(e => {
            console.error(e);
            setIsError(true);
        });
    }, []);
    const updateCourse = (course) => {
        (0, courses_service_1.updateCourse)(course)
            .then(() => {
            setIsLoading(false);
            setCourse(course);
        })
            .catch(e => {
            console.error(e);
            setIsError(true);
        });
    };
    return { data: courses, isLoading, isError, updateCourse };
};
exports.useCourse = useCourse;
