
import Course from '..';

export const getCourse = (id: string) => {
    return fetch(`/api/${id}`);
}

export const getCourses = () => {
    return fetch(`/api/courses`)
}

export const updateCourse = (course: Course) => {
    return fetch(`/api/courses/${course.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } });
}

export const createCourse = (course: Course) => {
    return fetch(`/api/courses`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
}

export const deleteCourse = (course: Course) => {
    return fetch(`/api/courses/${course.id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
}
    