import '../window';
import 'styles/tailwind.css';
import 'styles/global.scss';
import type { AppProps } from 'next/app'
import { wrapper } from 'store/configureStore';
import { initConfig } from '@joyid/nostr';
import { joyIdConfig } from 'core/joyid/config';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next'
import { NostrSigner } from "@rust-nostr/nostr-sdk";
import { useState } from "react";
import { CKBSigner, SingerContext } from "context/SignContext";
import { SignerProvider } from 'context/SignContext';
import { loadWasmSync } from "@rust-nostr/nostr-sdk";
import { startTransition, StrictMode } from "react";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const { store } = wrapper.useWrappedStore(pageProps);
  initConfig(joyIdConfig);

  const [nostrSigner, setNostrSigner] = useState<NostrSigner | null>(null);
  const [ckbSigner, setCKBSigner] = useState<CKBSigner | null>(null);

  const value = { nostrSigner, setNostrSigner, ckbSigner, setCKBSigner };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
            <meta name="description" content="a beautiful nostr client" />
            <meta
              name="keywords"
              content="nostr, nostr-protocol, social-network, bitcoin, lighting-network, decentralization"
            />
            {/* twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="flycat" />
            <meta name="twitter:url" content="https://flycat.club" />
            <meta
              name="twitter:description"
              content="a beautiful nostr client"
            />
            <meta
              name="twitter:image"
              content="https://flycat.club/logo512.png"
            />
            <meta name="twitter:creator" content="@flycatclub" />

            {/* ogp */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="flycat" />
            <meta
              property="og:description"
              content="a beautiful nostr client"
            />
            <meta property="og:site_name" content="flycat" />
            <meta property="og:url" content="https://flycat.club" />
            <meta
              property="og:image"
              content="https://flycat.club/logo512.png"
            />
          </Head>
          <SignerProvider>
            <Component {...pageProps} />
            {/* <Analytics />
            <Toaster /> */}
          </SignerProvider>
      </QueryClientProvider>
    </Provider>
  )
  
}

startTransition(() => {
  loadWasmSync();
});

export default appWithTranslation(App /*, nextI18NextConfig */)