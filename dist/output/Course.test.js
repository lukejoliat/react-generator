"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const msw_1 = require("msw");
const node_1 = require("msw/node");
const CourseDetail_1 = require("./CourseDetail");
const server = (0, node_1.setupServer)(msw_1.rest.get('/todos', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }));
}));
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
test('Renders CourseDetail', async () => {
    (0, react_1.render)(<CourseDetail_1.default />);
    expect(react_1.screen.getByRole('heading')).toHaveTextContent('Detail Component');
});
