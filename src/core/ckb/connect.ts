import {
    Nip07Signer,
    NostrSigner,
    PublicKey,
    UnsignedEvent,
  } from "@rust-nostr/nostr-sdk";
import { CKBSigner } from "context/SignContext";
import { NostrLock } from "protocol/script/nostr-lock.client";
import { bytes } from "@ckb-lumos/codec";
import { commons, helpers } from "@ckb-lumos/lumos";
import { blockchain } from "@ckb-lumos/base";
import { Unlock } from "protocol/event/unlock.client";
import { capacityOf, computeTransactionHash } from "protocol/ckb-helper.client";
import { nostr as joyIdNostr, logout as joyIdLogout } from '@joyid/nostr';

export class CKB {
    static buildNostrCKBSigner( publicKey: PublicKey, nostrSigner: NostrSigner ) {

            // update ckb signer context
    const signMessage = async (message: string) => {
        const unsignedEvent = UnsignedEvent.fromJson(message);
        const signedMessage = await nostrSigner.signEvent(unsignedEvent);
  
        return signedMessage.asJson();
      };
  
      const buildWitnessPlaceholder = (eventWitness: Uint8Array) => {
        const SECP_SIGNATURE_PLACEHOLDER = bytes.hexify(
          new Uint8Array(
            commons.omnilock.OmnilockWitnessLock.pack({
              signature: new Uint8Array(65).buffer,
            }).byteLength
          )
        );
  
        const witness = bytes.hexify(
          blockchain.WitnessArgs.pack({
            lock: SECP_SIGNATURE_PLACEHOLDER,
            outputType: bytes.hexify(eventWitness),
          })
        );
  
        return witness;
      };
  
      const buildSigningEntries = (txSkeleton: any, eventWitness: Uint8Array) => {
        const witness = buildWitnessPlaceholder(eventWitness);
        // fill txSkeleton's witness with placeholder
        for (let i = 0; i < txSkeleton.inputs.toArray().length; i++) {
          txSkeleton = txSkeleton.update(
            "witnesses",
            (witnesses: Immutable.List<string>) => witnesses.push(witness)
          );
        }
  
        // todo: we assume every input use the same nostr lock
        // this should be update for more real use case
        const tx = helpers.createTransactionFromSkeleton(txSkeleton);
        const txHash = computeTransactionHash(tx).slice(2);
        let rawEvent = Unlock.buildEvent(txHash);
        let signingEntries = txSkeleton.get("signingEntries") || [];
        const signingEntry = {
          type: "witness_args_lock",
          index: 0,
          message: rawEvent.toUnsignedEvent(publicKey).asJson(),
        };
        signingEntries = signingEntries.push(signingEntry);
  
        txSkeleton = txSkeleton.set("signingEntries", signingEntries);
  
        return txSkeleton;
      };
  
      const lockScript = NostrLock.buildScript(publicKey);
      const ckbAddress = helpers.encodeToAddress(lockScript);
      console.log(ckbAddress)
      const ckbSigner: CKBSigner = {
        buildSigningEntries,
        ckbAddress,
        originAddress: publicKey.toBech32(),
        lockScript,
        signMessage,
        cellDeps: NostrLock.buildCellDeps(),
      };
      return ckbSigner;
    }

    static buildJoyIdNostrCKBSigner ( publicKey: PublicKey, joyidSigner: any) {
      const signMessage = async (message: string) => {
        const unsignedEvent = UnsignedEvent.fromJson(message);
        const signedMessage = await joyidSigner.signEvent(unsignedEvent);
  
        return signedMessage.asJson();
      };
  
      const buildWitnessPlaceholder = (eventWitness: Uint8Array) => {
        const SECP_SIGNATURE_PLACEHOLDER = bytes.hexify(
          new Uint8Array(
            commons.omnilock.OmnilockWitnessLock.pack({
              signature: new Uint8Array(65).buffer,
            }).byteLength
          )
        );
  
        const witness = bytes.hexify(
          blockchain.WitnessArgs.pack({
            lock: SECP_SIGNATURE_PLACEHOLDER,
            outputType: bytes.hexify(eventWitness),
          })
        );
  
        return witness;
      };
  
      const buildSigningEntries = (txSkeleton: any, eventWitness: Uint8Array) => {
        const witness = buildWitnessPlaceholder(eventWitness);
        // fill txSkeleton's witness with placeholder
        for (let i = 0; i < txSkeleton.inputs.toArray().length; i++) {
          txSkeleton = txSkeleton.update(
            "witnesses",
            (witnesses: Immutable.List<string>) => witnesses.push(witness)
          );
        }
  
        // todo: we assume every input use the same nostr lock
        // this should be update for more real use case
        const tx = helpers.createTransactionFromSkeleton(txSkeleton);
        const txHash = computeTransactionHash(tx).slice(2);
        let rawEvent = Unlock.buildEvent(txHash);
        let signingEntries = txSkeleton.get("signingEntries") || [];
        const signingEntry = {
          type: "witness_args_lock",
          index: 0,
          message: rawEvent.toUnsignedEvent(publicKey).asJson(),
        };
        signingEntries = signingEntries.push(signingEntry);
  
        txSkeleton = txSkeleton.set("signingEntries", signingEntries);
  
        return txSkeleton;
      };
  
      const lockScript = NostrLock.buildScript(publicKey);
      const ckbAddress = helpers.encodeToAddress(lockScript);
      console.log(ckbAddress)
      const ckbSigner: CKBSigner = {
        buildSigningEntries,
        ckbAddress,
        originAddress: publicKey.toBech32(),
        lockScript,
        signMessage,
        cellDeps: NostrLock.buildCellDeps(),
      };
      return ckbSigner;
    }
}