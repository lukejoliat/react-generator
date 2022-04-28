import { buildNameVariations } from "../name-variations";

export const generate = (schema) => {
  const { ref, refs, model, models, singleParam } = buildNameVariations(schema);
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
