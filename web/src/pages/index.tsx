import { GetServerSideProps } from 'next';
import { getSession, useUser } from '@auth0/nextjs-auth0';

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <h1>Hello world!</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href="/api/auth/login">Login</a>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession(ctx.req, ctx.res);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      },
    };
  }
};
