import { publicAssets } from '../../../utils/publicAssets.ts';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../../shared/PrimaryButton.tsx';
import { Footer } from '../footer/Footer.tsx';

export const LandingPage = () => {
  return (
    <>
      <header className="sticky top-0 px-8 w-full h-20 flex flex-col justify-center bg-green text-white border-b">
        <div className="font-bold text-3xl">Reactify&trade;</div>
      </header>
      <section className="p-8 leading-tight bg-green text-white ">
        <header>
          <h1 aria-label="Your reactive Spotify client">
            Your reactive{' '}
            <img
              src={publicAssets.spotifyLogoWhite}
              className="inline h-12"
            />{' '}
            client.
          </h1>
          <p className="mt-5 font-semibold">
            Reactify&trade; is an open source Spotify client completely build
            using ReactJS. The goal is to use the potential of the Spotify API
            as much as possible and provide a seamless experience.
          </p>
        </header>
      </section>
      <main>
        <section className="px-8 py-12 bg-black text-green">
          <h1>Get the App</h1>
          <p className="mt-5 text-white">
            Reactify is designed to work as a standalone app on your device no
            matter your platform.{' '}
          </p>
          {/* TODO: /faq#pwa is not yet implemented. The exact link may chance in the future. */}
          <Link to="/faq#pwa">Learn more...</Link>
          <PrimaryButton
            className="block mt-12 px-16 h-12 rounded-lg"
            onClick={() =>
              console.warn('Installing the app as PWA is not supported yet.')
            }
          >
            Install
          </PrimaryButton>
        </section>
        <section className="px-8 py-12">
          <h1>
            Powered by{' '}
            <img
              src={publicAssets.spotifyLogoBlack}
              className="inline mt-2 h-12"
            />
          </h1>
          <p className="mt-5">
            Reactify is a client application that uses the{' '}
            <a href="https://www.spotify.com/">
              Spotify
              <sup>&copy;</sup>
            </a>{' '}
            API to provide its services. <br />
            Reactify is not associated, endorsed, etc. with or by Spotify.
          </p>
        </section>
        <section className="px-8 py-12 bg-purple text-white">
          <h1>Open Source</h1>
          <p className="mt-5">
            Reactify is completely open source so you can take a look at what we
            do with your data. (Nothing, cause that&apos;s none of our business
            😉)
          </p>
          <p className="mt-5">
            Visit the{' '}
            <a
              href="https://github.com/ExampleWasTaken/reactify/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub repository
            </a>{' '}
            for more info.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};
