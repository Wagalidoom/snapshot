import { handlerContext, User } from "generated";

export async function loadOrCreateUser(address: string, context: handlerContext): Promise<User> {
  let user = await context.User.get(address);
  if (user == null) {
    user = {
      id: address,
      voteWeight: BigInt(0),
      gno: BigInt(0),
      mgno: BigInt(0),
      lgno: BigInt(0),
      sgno: BigInt(0),
      deposit: BigInt(0),
      balancerInternalGno: BigInt(0),
    }
  }
  return user;
}