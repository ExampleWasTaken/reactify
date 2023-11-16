import { publicAssets } from '../../../../utils/publicAssets.ts';
import { PrimaryButton } from '../../../shared/PrimaryButton.tsx';
import React from 'react';

export const AppLogin = () => {
  const loginHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    console.warn('not yet implemented');
  };

  return (
    <div
      className="bg-black select-none text-white h-screen flex flex-col justify-between"
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
        <PrimaryButton
          className="mb-6 px-28 py-5 bg-green text-black text-xl rounded-lg"
          onClick={event => loginHandler(event)}
          aria-label="Login button"
        >
          Login
        </PrimaryButton>
        <section className="px-10 text-[#ccc] flex flex-col items-center">
          <p className="text-center">
            Reactify is not associated with Spotify AB.
          </p>
          <p className="text-center">
            {/* TODO: change to own T&C */}
            By using the service you agree to the{' '}
            <a href="https://www.spotify.com/us/legal/">
              Terms&nbsp;and&nbsp;Conditions
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
};
