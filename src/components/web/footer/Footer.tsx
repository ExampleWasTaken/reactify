import { FooterLink } from './FooterLink.tsx';
import { FooterAnchor } from './FooterAnchor.tsx';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="px-8 py-10 bg-[#000] text-white">
      <header>
        <h1 className="text-lg font-normal">Reactify&trade;</h1>
      </header>
      <section className="my-10 flex flex-col space-y-3">
        <h1 className="text-sm text-[#aaa]">PROJECT</h1>
        <FooterLink to="/docs">Documentation</FooterLink>
        <FooterLink to="/faq">FAQs</FooterLink>
        <FooterAnchor href="https://github.com/ExampleWasTaken/reactify">
          Repository
        </FooterAnchor>
        <FooterAnchor href="https://github.com/ExampleWasTaken/reactify/issues">
          Report an Issue
        </FooterAnchor>
      </section>
      <section className="my-10 flex flex-col space-y-3">
        <h1 className="text-sm text-[#aaa]">SPOTIFY</h1>
        <FooterAnchor href="https://www.spotify.com/">
          Spotify<sup>&copy;</sup>
        </FooterAnchor>
        <FooterAnchor href="https://developer.spotify.com/">
          Spotify<sup>&copy;</sup> for Developers
        </FooterAnchor>
      </section>
      <section className="my-10 flex flex-col space-y-3">
        <h1 className="text-sm text-[#aaa]">LEGAL</h1>
        <FooterAnchor href="https://github.com/ExampleWasTaken/reactify/blob/master/LICENSE">
          License (GNU v3)
          {/* TODO: Verify that's the correct name of the license */}
        </FooterAnchor>
        <FooterLink to="/3rd-party-licenses">3rd-Party Licenses</FooterLink>
        {/* TODO: Add link to 3rd-party licenses once the generation of that file is implemented */}
      </section>
      <footer className="mt-16 flex flex-row justify-end space-x-5">
        <Link
          to="/cookies"
          className="text-sm font-bold no-underline text-[#888]"
        >
          Cookies
        </Link>
        <p className="text-sm font-bold text-[#888]">
          &copy; Reactify {new Date().getFullYear()}
        </p>
      </footer>
    </footer>
  );
};