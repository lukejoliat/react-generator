"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const name_variations_1 = require("../name-variations");
const generate = (schema) => {
    const { ref, refs, model, models, singleParam } = (0, name_variations_1.buildNameVariations)(schema);
    const template = `
import {render, fireEvent, screen} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import ${model}Detail from './${model}Detail';

const server = setupServer(
    rest.get('/${refs}/1', (req, res, ctx) => {
        return res(ctx.json(
          // return ${ref}
        ))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Renders ${model}Detail', async () => {
  render(<${model}Detail id={'1'} />)

  expect(screen.getByRole('heading')).toHaveTextContent('Detail Component');
})
  `;
    return {
        template,
        fileName: `${model}.test.tsx`,
    };
};
exports.generate = generate;
