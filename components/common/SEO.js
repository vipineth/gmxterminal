import Head from 'next/head';
import { useRouter } from 'next/router';
import { getURL } from 'utils/helper';

export default function SEO(props) {
  const { children, ...customMeta } = props;
  const router = useRouter();

  let url = getURL(router.asPath);

  const meta = {
    title: 'Dashboard for GMX traders - GMXTerminal',
    description: `Dashboard to track the performance of GMX traders.`,
    image: 'https://gmxterminal.com/og.png',
    type: 'website',
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title} - GMXTerminal.com</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={url} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="GMXTerminal" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="keywords" content="gmx gmxterminal gmx analytics" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vipineth" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>

      {children}
    </>
  );
}
