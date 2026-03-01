import {notFound} from 'next/navigation';
import {getRouteById} from '@/data/routes';
import {RouteDetailClient} from './route-detail-client';

type Props = {
  params: Promise<{id: string; locale: string}>;
};

export function generateStaticParams() {
  const ids = Array.from({length: 13}, (_, i) => ({id: String(i + 1)}));
  return ids;
}

export default async function RouteDetailPage({params}: Props) {
  const {id} = await params;
  const routeId = parseInt(id, 10);
  const route = getRouteById(routeId);

  if (!route) {
    notFound();
  }

  return <RouteDetailClient route={route} />;
}
