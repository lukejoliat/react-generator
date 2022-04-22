"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.createCourse = exports.updateCourse = exports.getCourses = exports.getCourse = void 0;
const getCourse = (id) => {
    return fetch(`/api/${id}`);
};
exports.getCourse = getCourse;
const getCourses = () => {
    return fetch(`/api/courses`);
};
exports.getCourses = getCourses;
const updateCourse = (course) => {
    return fetch(`/api/courses/${course.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } });
};
exports.updateCourse = updateCourse;
const createCourse = (course) => {
    return fetch(`/api/courses`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
};
exports.createCourse = createCourse;
const deleteCourse = (course) => {
    return fetch(`/api/courses/${course.id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
};
exports.deleteCourse = deleteCourse;
