import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';

const IndexPage: NextPage = () => {
  const [session, loading] = useSession();
  return (
    <>
      <div>APP</div>
      {!session && (
        <>
          <div className="text-3xl">Not signed in</div> <br />
          <button
            onClick={(): void => {
              signIn('auth0');
            }}
          >
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          <div className="text-3xl">Signed in as {session.user.email}</div>
          <br />
          <button
            onClick={(): void => {
              signOut();
            }}
          >
            Sign out
          </button>
        </>
      )}
      {loading ? <span>Carregando</span> : null}
    </>
  );
};
export default IndexPage;
