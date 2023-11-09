import { Link } from 'react-router-dom';

export const AppError = () => {
  return (
    <main>
      <div
        className="mt-32 ml-16"
        aria-hidden="true"
      >
        <h1 className="mb-5 text-5xl font-bold mb-3">Oops!</h1>
        <p>Something went wrong there.</p>
        <p>
          Return to{' '}
          <Link
            className="text-green"
            to="/app/home"
          >
            Home
          </Link>
        </p>
      </div>
    </main>
  );
};
