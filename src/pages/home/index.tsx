import { BaseLayout, Left, Right } from "components/BaseLayout";
import { useCKBNostr } from "hooks/useCKBNostr";
import copy from 'copy-to-clipboard';
import LoginCard from "pages/login/LoginCard";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SingerContext } from "context/SignContext";
import { useContext } from "react";


export default function Home() {
    // const {nostrSigner, setNostrSigner, setNostrPubkey, nostrPubkey, ckbSigner,
    //     setCKBSigner, setCKBAddress, ckbAddress, balance, setBalance} = useCKBNostr()
    // const { nostrSigner, setNostrSigner, ckbSigner, setCKBSigner } =
    // useContext(SingerContext)!;

    return (
      <BaseLayout silent={true}>
            <Left>
            {/* <div className="flex flex-col"> */}
            {/* <button onClick={connect}>
                {nostrPubkey
                ? `${nostrPubkey.slice(0, 8)}..${nostrPubkey.slice(-4)}`
                : "Connect Nostr"}
            </button> */}
            {/* {nostrPubkey
                ? `${nostrPubkey.slice(0, 8)}..${nostrPubkey.slice(-4)}`
                : "Connect Nostr"}
            {ckbAddress && <div onClick={()=>copy(ckbAddress, {onCopy: (_) => alert("address copied: " + ckbAddress)})}>{ckbAddress.slice(0, 8)}..{ckbAddress.slice(-4)}</div>}
            {ckbAddress && balance != null && <div>{balance} CKB</div>} */}
            {/* </div> */}
            <LoginCard/>
          </Left>
          <Right></Right>
      </BaseLayout>
    );
  }

  export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  });