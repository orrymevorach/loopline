import Head from 'next/head';

export default function Meta() {
  const tabTitle = `Loopline`;
  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='description' content='' />
      <meta name='keywords' content='' />
      <title>{tabTitle}</title>
      <link rel='icon' href='/favicon.png' />
    </Head>
  );
}
