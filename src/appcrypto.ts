import config from "./config";

export class AppCrypto {
  private static secret = config.env.apiUrl;

  // Méthode pour chiffrer une chaîne de texte
  public static async encrypt(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Génération d'un IV aléatoire (12 octets)
    const key = await this.deriveKey(this.secret);

    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoder.encode(text)
    );

    // Combinaison IV + données chiffrées, puis conversion en Base64
    const combined = new Uint8Array(iv.byteLength + encrypted.byteLength);

    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.byteLength);

    return this.arrayBufferToBase64(combined.buffer);
  }

  // Méthode pour déchiffrer une chaîne chiffrée
  public static async decrypt(encryptedText: string): Promise<string> {
    const decoder = new TextDecoder();
    const encryptedData = this.base64ToArrayBuffer(encryptedText);

    // Extraction de l'IV et des données chiffrées
    const iv = encryptedData.slice(0, 12); // Les 12 premiers octets correspondent à l'IV
    const data = encryptedData.slice(12);

    const key = await this.deriveKey(this.secret);

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(iv) },
      key,
      data
    );

    return decoder.decode(decrypted);
  }

  // Méthode privée pour dériver une clé à partir du secret
  private static async deriveKey(secret: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();

    if (
      typeof window === "undefined" ||
      !window.crypto ||
      !window.crypto.subtle
    ) {
      throw new Error(
        "L'API Web Crypto n'est pas disponible dans cet environnement. Veuillez utiliser un navigateur moderne ou ajouter un polyfill pour Node.js."
      );
    }

    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode("unique_salt"), // Remplacez par un sel unique et sécurisé
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  // Méthode privée : Conversion d'ArrayBuffer vers Base64
  private static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(buffer);
    const charCodes = byteArray.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );

    return btoa(charCodes);
  }

  // Méthode privée : Conversion de Base64 vers ArrayBuffer
  private static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++)
      byteArray[i] = binaryString.charCodeAt(i);

    return byteArray.buffer;
  }

  private static async getHmacKey(): Promise<CryptoKey> {
    // Importer la clé secrète sous forme de CryptoKey
    const encoder = new TextEncoder();
    const keyData = encoder.encode(config.env.apiUrl);

    return crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["sign"]
    );
  }

  private static async computeHmac(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await AppCrypto.getHmacKey();
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(data)
    );

    return AppCrypto.arrayBufferToBase64(signature);
  }

  public static async getHmac(key: string): Promise<string> {
    return AppCrypto.computeHmac(key);
  }
}
