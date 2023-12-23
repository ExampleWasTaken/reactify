import { Header } from '../../header/Header.tsx';
import { Link } from 'react-router-dom';
import { routes } from '../../../../utils/routes.ts';
import { Footer } from '../../footer/Footer.tsx';

export const _404 = () => {
  return (
    <>
      <Header />
      <main className="px-10 py-32 flex flex-col justify-center items-right space-y-5">
        <h1>Oh no!</h1>
        <p>We can&apos;t find the page you&apos;re looking for.</p>
        <p>
          If you think this is an error, please{' '}
          <a
            href="https://github.com/ExampleWasTaken/reactify/issues/"
            target="_blank"
            rel="noreferrer"
          >
            file an issue
          </a>{' '}
          on GitHub.
        </p>
        <p>Otherwise we hope these options are somewhat helpful to you:</p>
        <ul>
          <li>
            <Link to={routes.root}>Home</Link>
          </li>
          <li>
            <Link to={routes.documentation}>Documentation</Link>
          </li>
        </ul>
      </main>
      <Footer />
    </>
  );
};
