export const About = () => {
  return (
    <>
      <main>
        <header className="px-5 pt-10 pb-32 text-white flex items-start bg-aboutUsPattern bg-cover backdrop-brightness-75">
          <h1 className="">About us</h1>
        </header>
        <div
          className="p-5 flex flex-col space-y-5"
          aria-hidden="true"
        >
          <section>
            <h2>Reactify</h2>
            <p>
              Reactify is a Spotify client built using web technologies. It is
              optimized for mobile usage and to be used as installed PWA.
            </p>
          </section>
          <section>
            <h3>Why?</h3>
            <p>
              The main purpose of this project is to get more comfortable with
              handling advanced APIs.
            </p>
            <p>
              The reason I chose Spotify is because it offers a great amount of
              content that requires advanced UIs and API handling.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};
