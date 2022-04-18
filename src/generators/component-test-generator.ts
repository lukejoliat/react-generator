import { buildNameVariations } from "../name-variations";

const generator = (schema) => {
  const { ref, refs, model, models, singleParam } = buildNameVariations(schema);
  const template = `
import {render, fireEvent, screen} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import ${model}Detail from './${model}Detail';

const server = setupServer(
    rest.get('/todos', (req, res, ctx) => {
        return res(ctx.json({greeting: 'hello there'}))
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Renders ${model}Detail', async () => {
  render(<${model}Detail />)

  expect(screen.getByRole('heading')).toHaveTextContent('Detail Component');
})
  `;
  return {
    template,
    fileName: `${model}.test.tsx`,
  };
};
