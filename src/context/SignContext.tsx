import { NostrSigner } from "@rust-nostr/nostr-sdk";
import { useState } from "react";
import { CellDep, Script } from "@ckb-lumos/lumos";
import { createContext } from "react";
import { RawEvent } from "core/nostr/RawEvent";

export interface CKBSigner {
  ckbAddress: string;
  lockScript: Script;
  originAddress: string; // eth wallet/unisat ... the original address
  signMessage: (message: string) => Promise<string>;
  buildSigningEntries: (tx: any, eventWitness: Uint8Array) => any;
  cellDeps: CellDep[];
}

export interface SingerContextType {
  nostrSigner: NostrSigner | null;
  setNostrSigner: (signer: NostrSigner) => void;
  ckbSigner: CKBSigner | null;
  setCKBSigner: (signer: CKBSigner) => void;
}

export const defaultSingerContext = {
  nostrSigner: null,
  setNostrSigner: () => {},
  ckbSigner: null,
  setCKBSigner: () => {},
};

export const SingerContext =
  createContext<SingerContextType>(defaultSingerContext);

export const SignerProvider = ({ children }:{children: React.ReactNode}) => {

    const [nostrSigner, setNostrSigner] = useState<NostrSigner | null>(null);
    const [ckbSigner, setCKBSigner] = useState<CKBSigner | null>(null);

    const value = { nostrSigner, setNostrSigner, ckbSigner, setCKBSigner };
  
    return (
      <SingerContext.Provider value={value}>
        {children}
      </SingerContext.Provider>
    );
}