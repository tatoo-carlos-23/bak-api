import type { IByEmailAndIsClient } from "@bk/repositories/users/users.types";

export const loginMapper = (body: IByEmailAndIsClient) => {
  let fullName: string | null = null;

  if (body?.names && body?.last_names) {
    fullName = `${body.names} ${body.last_names}`;
  }

  return {
    id: body.id,
    email: body.email,
    names: body.names,
    lastNames: body.last_names,
    fullName,
    acceptsTerms: body.accepts_terms === 1,
    acceptPrivacyTerms: body.accept_privacy_terms === 1,
  };
};
