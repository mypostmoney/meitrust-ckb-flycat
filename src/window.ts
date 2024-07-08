import { Nip06 } from 'core/nip/06';
import { WebLNProvider } from '@webbtc/webln-types';
import { Ethereum } from '@wagmi/core';

declare global {
  interface Window {
    nostr?: Nip06;
    webln?: WebLNProvider;
    ethereum?: Ethereum;
    twttr?: any;
    selfEvent?: any;
  }
}
