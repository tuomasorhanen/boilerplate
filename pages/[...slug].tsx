import MyFooter from 'components/footer/Footer';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { groq } from 'next-sanity';

import { client } from '../_lib/client';
import resolveLinks from '../_lib/resolveLinks';
import resolveReferences from '../_lib/resolvers/resolveReferences';
import { IHeadingAndTitle, IHero, IPost, ISiteSettings } from '../_lib/types';
import Header, { IMenuItem } from '../components/header/Header';
import MapContent from '../components/MapContent';
import SocialButtons from 'components/social buttons/SocialButtons';

type IPageProps = {
  name: string;
  title: string;
  description: string;
  content: IHero[] | IHeadingAndTitle[];
  blogs: IPost[];
  menu: IMenuItem[];
  settings: ISiteSettings;
};

const IndexPage = (props: IPageProps) => {
  const { content, menu, settings, name, description } = props;

  const heroBgColor =
    content[0] && (content[0] as IHero)._type === 'hero' ? (content[0] as IHero).heroBgColor?.hex : '';

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={description} />
      </Head>
      <Header items={menu} settings={settings} heroBgColor={heroBgColor} key={heroBgColor} />
      <MapContent content={content} />
      <SocialButtons />
      <MyFooter items={menu} />
      <style jsx global>{`
        :root {
          --bg-color: ${settings.bgColor.hex};
          --text-color: ${settings.textColor.hex};
          --accent-color: ${settings.accentColor.hex};
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IPageProps> = async context => {
  context.res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');

  let { slug } = context.query;

  const pageQuery = groq`
    *[_type == 'page' && slug.current == '${slug}'][0]
  `;

  let pageResponse = await client.fetch(pageQuery);

  if (pageResponse == null) {
    return {
      notFound: true,
    };
  }
  const blogsQuery = groq`
    *[_type == 'post']
  `;
  const menuQuery = groq`
  *[_type == 'page' && defined(menuOrder)]{
    name,
    slug,
    menuOrder,
    title,
  } | order(menuOrder asc)`;
  const siteSettingsQuery = groq`
  *[_type == 'siteSettings'][0]
`;

  let [blogsResponse, menuResponse, siteSettingsResponse] = await Promise.all([
    client.fetch(blogsQuery),
    client.fetch<IMenuItem[]>(menuQuery),
    client.fetch(siteSettingsQuery),
  ]);

  pageResponse = await resolveLinks(pageResponse);
  pageResponse = await resolveReferences(pageResponse);

  const { name, title, description } = pageResponse;

  return {
    props: {
      name,
      title,
      description,
      content: pageResponse.content,
      blogs: blogsResponse,
      menu: menuResponse,
      settings: siteSettingsResponse,
    },
  };
};

export default IndexPage;