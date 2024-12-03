'use server';
import { RedisChatRepository } from '@/modules/chat/infrastructure/redis-chat-repository';
import { client } from '@/modules/shared/infrastructure/persistence/redis/redis-client';
import { getCurrentUser } from '../user/get-current-user';
import { getAssistantSettings } from './get-assistant-settings';

export async function getLatestChat() {
  const settings = await getAssistantSettings();
  if (!settings?.enabled) return null;

  const userResponse = await getCurrentUser();
  const user = userResponse?.data;

  const userId = user?.id;

  if (!userId) {
    return null;
  }

  try {
    const repository = new RedisChatRepository(client);
    const chat = await repository.getLastChat(userId);
    return chat;
  } catch (error) {
    return null;
  }
}