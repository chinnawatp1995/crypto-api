export class PlaceOrderDto {
  userId: number;
  orderType: 'buy' | 'sell';
  price: number;
  amount: number;
}

export class CancelOrderDto {
  userId: number;
  orderId: number;
}

export class SearchQuery {
  orderType?: 'buy' | 'sell';
  src: 'THB' | 'USD' | 'BTC' | 'ETH' | 'XRP' | 'DOGE';
  dest: 'THB' | 'USD' | 'BTC' | 'ETH' | 'XRP' | 'DOGE';
  status: 'open' | 'filled' | 'cancelled';
}
