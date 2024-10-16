import { getSights } from '@/lib/graphql/queries';
import client from '@/lib/graphql/serverClient';
import dynamic from 'next/dynamic';

async function HomePage() {
  const { data } = await client.query({
    query: getSights,
  });

  const Map = dynamic(() => import('../components/Map'), {
    loading: () => <p style={{ marginLeft: '20px' }}>Map is loading</p>,
    ssr: false,
  });
  return <Map locations={data.sights} />;
}

export default HomePage;
