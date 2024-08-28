/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  GnosisToken,
  GnosisToken_Transfer,
  NonfungiblePositionManager,
  NonfungiblePositionManager_DecreaseLiquidity,
  NonfungiblePositionManager_IncreaseLiquidity,
  NonfungiblePositionManager_Transfer,
  TokenLock,
  TokenLock_Transfer,
  UniswapV3Factory,
  UniswapV3Factory_PoolCreated,
  User,
  Vault,
  Vault_InternalBalanceChanged,
  Vault_PoolBalanceChanged,
  Vault_Swap,
  Vyper_contract,
  Vyper_contract_Transfer,
  WeightedPoolFactory,
  WeightedPoolFactory_PoolCreated,
} from "generated";
import { loadOrCreateUser } from "./helpers/user";

GnosisToken.Transfer.handler(async ({ event, context }) => {
  const entity: GnosisToken_Transfer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    to: event.params.to,
    value: event.params.value,
  };

  context.GnosisToken_Transfer.set(entity);

  const to = event.params.to;
  const from = event.params.from;

  if (from != "0x0000000000000000000000000000000000000000") {
    const userFrom = await loadOrCreateUser(from, context);
    const userFromUpdated: User = {
      id: userFrom.id,
      voteWeight: userFrom.voteWeight - event.params.value,
      gno: userFrom.gno - event.params.value,
      mgno: userFrom.mgno,
      lgno: userFrom.lgno,
      sgno: userFrom.sgno,
      deposit: userFrom.deposit,
      balancerInternalGno: userFrom.balancerInternalGno,
    }
    context.User.set(userFromUpdated);
  }

  if (to != "0x0000000000000000000000000000000000000000") {
    const userTo = await loadOrCreateUser(to, context);
    const userToUpdated: User = {
      id: userTo.id,
      voteWeight: userTo.voteWeight + event.params.value,
      gno: userTo.gno + event.params.value,
      mgno: userTo.mgno,
      lgno: userTo.lgno,
      sgno: userTo.sgno,
      deposit: userTo.deposit,
      balancerInternalGno: userTo.balancerInternalGno,
    }
    context.User.set(userToUpdated);
  }
});


NonfungiblePositionManager.DecreaseLiquidity.handler(async ({ event, context }) => {
  const entity: NonfungiblePositionManager_DecreaseLiquidity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    tokenId: event.params.tokenId,
    liquidity: event.params.liquidity,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
  };

  context.NonfungiblePositionManager_DecreaseLiquidity.set(entity);
});


NonfungiblePositionManager.IncreaseLiquidity.handler(async ({ event, context }) => {
  const entity: NonfungiblePositionManager_IncreaseLiquidity = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    tokenId: event.params.tokenId,
    liquidity: event.params.liquidity,
    amount0: event.params.amount0,
    amount1: event.params.amount1,
  };

  context.NonfungiblePositionManager_IncreaseLiquidity.set(entity);
});


NonfungiblePositionManager.Transfer.handler(async ({ event, context }) => {
  const entity: NonfungiblePositionManager_Transfer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    to: event.params.to,
    tokenId: event.params.tokenId,
  };

  context.NonfungiblePositionManager_Transfer.set(entity);
});


TokenLock.Transfer.handler(async ({ event, context }) => {
  const entity: TokenLock_Transfer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    to: event.params.to,
    value: event.params.value,
  };

  context.TokenLock_Transfer.set(entity);
});


UniswapV3Factory.PoolCreated.handler(async ({ event, context }) => {
  const entity: UniswapV3Factory_PoolCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    token0: event.params.token0,
    token1: event.params.token1,
    fee: event.params.fee,
    tickSpacing: event.params.tickSpacing,
    pool: event.params.pool,
  };

  context.UniswapV3Factory_PoolCreated.set(entity);
});


Vault.InternalBalanceChanged.handler(async ({ event, context }) => {
  const entity: Vault_InternalBalanceChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    user: event.params.user,
    token: event.params.token,
    delta: event.params.delta,
  };

  context.Vault_InternalBalanceChanged.set(entity);
});


Vault.PoolBalanceChanged.handler(async ({ event, context }) => {
  const entity: Vault_PoolBalanceChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    poolId: event.params.poolId,
    liquidityProvider: event.params.liquidityProvider,
    tokens: event.params.tokens,
    deltas: event.params.deltas,
    protocolFeeAmounts: event.params.protocolFeeAmounts,
  };

  context.Vault_PoolBalanceChanged.set(entity);
});


Vault.Swap.handler(async ({ event, context }) => {
  const entity: Vault_Swap = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    poolId: event.params.poolId,
    tokenIn: event.params.tokenIn,
    tokenOut: event.params.tokenOut,
    amountIn: event.params.amountIn,
    amountOut: event.params.amountOut,
  };

  context.Vault_Swap.set(entity);
});


Vyper_contract.Transfer.handler(async ({ event, context }) => {
  const entity: Vyper_contract_Transfer = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    _from: event.params._from,
    _to: event.params._to,
    _value: event.params._value,
  };

  context.Vyper_contract_Transfer.set(entity);
});


WeightedPoolFactory.PoolCreated.handler(async ({ event, context }) => {
  const entity: WeightedPoolFactory_PoolCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    pool: event.params.pool,
  };

  context.WeightedPoolFactory_PoolCreated.set(entity);
});

