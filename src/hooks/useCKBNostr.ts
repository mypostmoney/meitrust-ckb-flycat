import { NostrSigner } from "@rust-nostr/nostr-sdk";
import { CKBSigner, SingerContext } from "context/SignContext";
import { useContext, useEffect, useState } from "react";
import { loadTempMyPublicKey } from "store/util";

export interface CKBNostrProps {
    ckbSigner: CKBSigner,
    setCKBSigner: (signer: CKBSigner) => void,
    ckbAddress: string,
    setCKBAddress: (ckbAddress: string) => void,
    nostrPubkey?: string,
    setNostrPubkey?: (nostrPubkey: string) => void,
    balance?: string,
    setBalance?: (balance: string) => void,
    nostrSigner?: NostrSigner,
    setNostrSigner?: (singer: NostrSigner) => void
}

export function useCKBNostr() {

    const [nostrPubkey, setNostrPubkey] = useState<string>();
    const [ckbAddress, setCKBAddress] = useState<string>();
    const [balance, setBalance] = useState<string>();
    const { nostrSigner, setNostrSigner, ckbSigner, setCKBSigner } =
      useContext(SingerContext)!;

    useEffect(() => {
        // const pk = loadTempMyPublicKey();
        // setNostrPubkey(pk)
        console.log(nostrPubkey)
      }, []);

    let data = {
        ckbSigner,
        setCKBSigner,
        ckbAddress,
        setCKBAddress,
        nostrPubkey,
        setNostrPubkey,
        balance,
        setBalance,
        nostrSigner,
        setNostrSigner,
    }

    return data
}