import { v4 as uuidv4 } from 'uuid';

export interface User {
  guid: string
  username: string
  image_url: string
}

export function newUser(username: string, image_url?: string): User {
  return {
    guid: uuidv4(),
    username,
    image_url: image_url ?? 'https://avatars.githubusercontent.com/u/27806?v=4'
  }
}