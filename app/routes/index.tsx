import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto">
          <h1 className="text-center">Welcome to blog demo!</h1>
          <p className="text-center">
            Press a button/link below to get started with.
          </p>

          <div className="not-prose text-center grid grid-flow-col gap-4">
            <Link to="/posts" prefetch="render">
              <button className="btn btn-block">Posts</button>
            </Link>
            <Link to="/admin" prefetch="render">
              <button className="btn btn-primary btn-block">Admin</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
