"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const CourseDetail = ({ course }) => {
    const { data, isLoading, isError } = useCourse(undefined);
    return (<h1>Detail Component</h1>);
};
exports.default = CourseDetail;
