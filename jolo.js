import { JolocomLib } from 'jolocom-lib'
import { crypto } from 'crypto'

// Feel free to use a better rng module
const seed = crypto.randomBytes(32);
const password = 'It takes the seed in cleartext, and a password that will be used as a key to encrypt the provided seed on the instance.';

const vaultedKeyProvider = JolocomLib.KeyProvider.fromSeed(seed, password);
const encryptedSeed = vaultedKeyProvider.encryptedSeed;

const publicEthKey = vaultedKeyProvider.getPublicKey({
    encryptionPass: encryptedSeed,
    derivationPath: JolocomLib.KeyTypes.ethereumKey // "m/44'/60'/0'/0/0"
});


await JolocomLib.util.fuelKeyWithEther(publicEthKey);