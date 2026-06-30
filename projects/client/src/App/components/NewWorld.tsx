import { Nav } from './Nav';

export const NewWorld = () => {
  return (
    <>
      <Nav />
      <article>
        <h2>new</h2>
        <form action="/api/v1/launch" method="post">
          <label htmlFor="label">name</label>
          <input
            defaultValue=""
            name="name"
            placeholder="name"
            type="text"
          />
          <button type="submit">create</button>
        </form>
      </article>
    </>
  );
};
