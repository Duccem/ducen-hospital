import { getCurrentUser } from '@/app/(server)/actions/user/get-current-user';
import { SidebarProvider } from '@/libs/shadcn-ui/components/sidebar';
import React from 'react';
import { v4 } from 'uuid';
import ModalAssistant from '../../components/assistant/modal-assistant';
import { ChatAIProvider } from '../../components/chat/chat-ai-provider';
import KBar from '../../components/kbar';
import SideBar from '../../components/side-bar/side-bar';
import TopBar from '../../components/top-bar/top-bar';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data!;

  return (
    <div className="flex justify-start items-start w-full styled-scroll">
      <ChatAIProvider
        initialAIState={{
          user: {
            id: user.id,
            name: user.name,
            image: user.image || '',
          },
          messages: [],
          chatId: v4(),
        }}
      >
        <SidebarProvider>
          <SideBar role={user.role as string} />
          <KBar>
            <div className="flex flex-col items-start w-full styled-scroll">
              <TopBar />
              {children}
            </div>
          </KBar>
          <ModalAssistant />
        </SidebarProvider>
      </ChatAIProvider>
    </div>
  );
};

export default Layout;
