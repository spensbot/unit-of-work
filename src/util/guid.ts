import { v4 as uuidv4 } from 'uuid';

export function uowGuid(): string {
  return uuidv4()
}

/// It may be preferable to allow guids to be undefined when they are referenced in multiple places.
/// When a guid is deleted, it should be noted as deleted in the UI, so the user can adapt accordingly.
/// The app should be able to handle the missing T gracefully.
export type GuidMap<T> = { [guid: string]: T | undefined }
/// Some guids aren't referenced in multiple places.
/// It may be reasonable to ensure that dead guids are never stored.
/// In this case, the app doesn't need to handle missing Ts
export type GuaranteedGuidMap<T> = { [guid: string]: T }