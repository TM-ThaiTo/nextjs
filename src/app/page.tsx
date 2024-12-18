'use server';
import LoadPostsHomePage from '@/components/post/post-home/app.load-posts'
import UiCreatePost from '@/components/create_post/ui_create_post';
import { action_dataMyUser, getSuggestedUser } from '@/actions/user/actions';
import { action_GetPostHome } from '@/actions/post/actions';
import { Contacts } from '@/components/layout/auth-layout/navbar/app.contact';
import { getConversation } from '@/actions/chat/p2p/conversation/actions';
import { getGroup } from '@/actions/chat/group/conversation/actions';
import LayoutPageHome from '@/components/LayoutPageHome/LayoutPageHome';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/session/auth-setting';
import LayoutLogin from '@/components/auth/login-page';

export async function generateMetadata() {
  return {
    title: 'Alex Trinh Social',
    description: 'Alex Trinh Social bio',
    openGraph: {
      title: 'Alex Trinh Social',
      description: 'Alex Trinh Social bio',
      url: '/',
      type: 'article',
    }
  }
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return <LayoutLogin />
  const { data: dataUser } = await action_dataMyUser();
  const user = { ...dataUser?.data, id: dataUser?.data?._id, }

  let dataPostHome: any = null;
  const { data } = await action_GetPostHome(1, 10);
  if (data) dataPostHome = data?.data;
  const { data: conversations } = await getConversation();
  const { data: dataGroup } = await getGroup();
  const { data: suggestedUser } = await getSuggestedUser();

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: 3200, width: '100%', justifyContent: 'center' }}>
        <LayoutPageHome>
          <UiCreatePost user={user} />
          <LoadPostsHomePage data={dataPostHome} myUser={user} />
        </LayoutPageHome>

        <Contacts
          myUser={dataUser?.data}
          conversations={conversations}
          dataGroup={dataGroup?.data}
          suggestedUser={suggestedUser?.data}
        />
      </div>
    </div>
  )
}

