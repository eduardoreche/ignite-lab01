import { GetServerSideProps } from 'next';
import { getSession, useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <h1>Hello world!</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <Link href="/api/auth/login">Login</Link>
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
