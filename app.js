const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const JolocomLib = require("jolocom-lib");

app.use(bodyParser.json());

const seed = crypto.randomBytes(32);
const password = 'It takes the seed in cleartext, and a password that will be used as a key to encrypt the provided seed on the instance.';

const regOP = async() => {
const vaultedKeyProvider = JolocomLib.KeyProvider.fromSeed(seed, password);
console.log('seed valid...')
const encryptedSeed = vaultedKeyProvider.encryptedSeed;
console.log('Encrypted Sedd....',encryptedSeed);

const publicEthKey = vaultedKeyProvider.getPublicKey({
    encryptionPass: encryptedSeed,
    derivationPath: JolocomLib.KeyTypes.ethereumKey // "m/44'/60'/0'/0/0"
});
console.log('fueling...')
await JolocomLib.util.fuelKeyWithEther(publicEthKey);

console.log('registering...')
const registry = JolocomLib.registries.jolocom.create()
await registry.create(vaultedKeyProvider, password)

const IdentityWallet = await registry.authenticate(vaultedKeyProvider, {
    derivationPath: JolocomLib.KeyTypes.jolocomIdentityKey,
    encryptionPass: password
});
console.log("Registered...",IdentityWallet);
}



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Listening at PORT : ${PORT}`);
});


