export interface Nip04 {
  encrypt(pubkey: any, plaintext: any): Promise<string>; // returns ciphertext+iv as specified in nip04
  decrypt(pubkey: any, ciphertext: any): Promise<string>; // takes ciphertext+iv as specified in nip04
}
