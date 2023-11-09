import { publicAssets } from '../../../utils/publicAssets.ts';

export const AppLogin = () => {
  return (
    <div
      className="bg-black text-white h-full flex flex-col justify-between"
      aria-hidden="true"
    >
      <header className="mt-32 flex justify-center">
        <h1 className="text-green text-5xl font-bold">
          Reactify<span className="font-normal">&trade;</span>
        </h1>
      </header>
      <section className="flex flex-col justify-center items-center">
        <p>powered by</p>
        <img
          className="h-[70px]"
          src={publicAssets.spotifyLogoGreen}
          alt="Spotify logo"
        />
      </section>
      <main className="mb-10 flex flex-col justify-end items-center">
        <button
          className="mb-6 px-28 py-5 bg-green text-black text-xl rounded-lg"
          aria-label="Login button"
        >
          Login
        </button>
        <section className="px-10 text-[#ccc] flex flex-col items-center">
          <p className="text-center">
            Reactify is not associated with Spotify AB.
          </p>
          <p className="text-center">
            Reactify does not own any content provided through the service.
          </p>
        </section>
      </main>
    </div>
  );
};
