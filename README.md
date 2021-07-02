### Example Env

[Installation](#installation)

[Decrypt Method](#decrypt-method)

[Encrypt Method](#encrypt-method)

[Encryption and Decryption Arguments](#encryption-and-decryption-arguments)
  - [algorithm](#encryptdecrypt-algorithm)
  - [envs](#encryptdecrypt-envs)
  - [encoding](#encryptdecrypt-encoding)
  - [input](#encryptdecrypt-input)
  - [iv](#encryptdecrypt-iv)
  - [secret](#encryptdecrypt-secret)

[Encryption and Decryption Limitations](#encryption-and-decryption-limitations)

[Submodule Imports](#submodule-imports)
  
## Installation

```bash
# with npm
npm install git+ssh://git@github.com/mattcarlotta/example-env

# or with yarn
yarn add git+ssh://git@github.com/mattcarlotta/example-env
```

## Decrypt Method

If you wish to manaully decrypt an encrypted string, then the decrypt method will parse the encrypted string and return an `Object` with `decryptedEnvs` as a single string of `KEY=value` pairs and a `decryptedResult` as either decrypted parsed `JSON` or a decrypted `Buffer`.

The `decrypt` method accepts a single `Object` argument with the following **required** properties (see [Encryption and Decryption Arguments](#encryption-and-decryption-arguments) for more details): 
```js
{ 
  algorithm: string, 
  envs: string (encrypted), 
  encoding: BufferEncoding,
  input: Encoding,
  iv: string,
  secret: CipherKey
}
```

Example:
```js
const env = require("@noshot/env");
// import env from "@noshot/env";

const result = env.decrypt({ 
  algorithm: "aes-256-cbc", 
  envs: "b8cb1867e4a8248c839db9cb0f1e1d", 
  encoding: "utf8", 
  input: "hex", 
  iv: "05c6f2c47de0ecfe", 
  secret: "abcdefghijklmnopqrstuv1234567890" 
});

console.log(typeof decryptedEnvs, result.decryptedEnvs); // string - a single string of "KEY=value" pairs
console.log(typeof decryptedResult, result.decryptedResult); // object - { "KEY": "VALUE" } as JSON object
// console.log(typeof decryptedResult, result.decryptedResult); // object - <Buffer xx xx xx ...etc>
```

## Encrypt Method

If you wish to manaully encrypt a flat stringified JSON object or a Buffer, then the encrypt method will encrypt the string/Buffer and return an `Object` with `encryptedEvs` and an [`iv`](#encryptdecrypt-iv).

The `encrypt` method accepts a single `Object` argument with the following **required** properties (see [Encryption and Decryption Arguments](#encryption-and-decryption-arguments) for more details): 
```js
{ 
  algorithm: string, 
  envs: string (stringified JSON object) | Buffer, 
  encoding: BufferEncoding,
  input: Encoding,
  secret: CipherKey
}
```

Example:
```js
const env = require("@noshot/env");
// import env from "@noshot/env";

const result = env.encrypt({ 
  algorithm: "aes-256-cbc", 
  envs: JSON.stringify({ "KEY": "value" }), 
  encoding: "utf8", 
  input: "hex", 
  secret: "abcdefghijklmnopqrstuv1234567890" 
});

console.log(typeof encryptedEvs, result.encryptedEvs); // string - a single encrypted string
console.log(typeof iv, result.iv); // string - a random encryption/decryption string
```

## Encryption and Decryption Arguments

Encryption and decryption methods share similar arguments and here's a breakdown of each one:

### Encrypt/Decrypt algorithm

The `algorithm` argument is a `string` that is dependent on OpenSSL. On recent OpenSSL releases, `openssl list -cipher-algorithms` (`openssl list-cipher-algorithms` for older versions of OpenSSL) will display the available cipher algorithms for your version.

### Encrypt/Decrypt envs

The `envs` argument is, depending on the method, either a stringified JSON object or a Buffer for the [encrypt method](#encrypt-method); or, a single encrypted string of Envs for the [decrypt method](#decrypt-method).

Encrypt (JSON string):
```js
const jsonString = JSON.stringify({ "KEY": "value" });
```
Encrypt (Buffer):
```js
const buf = Buffer.from("KEY=value");
```

Decrypt (a stringified value derived from the encrypt method):
```
b8cb1867e4a8248c839db9cb0f1e1d
```

### Encrypt/Decrypt encoding

Both methods expect the `encoding` argument to be a `string` type of character [BufferEncoding](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings).

### Encrypt/Decrypt input

Both methods expect the `input` argument to be a `string` type of either `base64` or `hex`.

### Encrypt/Decrypt iv

The `iv`, or [Initialization Vector](https://en.wikipedia.org/wiki/Initialization_vector), is a randomly generated string that is used to encrypt or decrypt a single string. Since it's randomly generated and unique to when it was created, ideally, it should be stored on a disk inaccessible to the source machine. Missplacing or forgetting the `iv` will mean that you have to regenerate a new encrypted string to retrieve a new iv. This `iv` should **never** be commited to version control!

### Encrypt/Decrypt secret

The `secret` should be a randomly generated [CipherKey (see `key`)](https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options) that is one byte in length and is used to encrypt or decrypt a single string. This `secret` should **never** be commited to version control!


### Encryption and Decryption Limitations

Due to the decryption method converting stringified JSON Envs to a non-standard format: `KEY=value`, double/single quotes can **NOT** be used in values (there's no performant way to only remove surrounding quotes from a `"KEY"` and a `'"value"'` without splitting key-value pairs into individual strings, removing the extraneous surrounding quotes, then rechunking them into pairs). Instead, it's recommended that you use a Buffer to retain quotes:

For example, instead of using JSON:
```json
{
  "ABC": "123",
  "DEF": '"   567   "'
}
```

Use a Buffer:
```js
const buf = Buffer.from(`ABC=123\nDEF="  567  "`);
```

### Submodule Imports

You can import submodules directly by their name:

```js
// DECRYPT (CJS)
const { decrypt } = require("@noshot/env/decrypt");
const decrypt = require("@noshot/env/decrypt").default;
// DECRYPT (ESM)
import decrypt from "@noshot/env/decrypt";
import decrypt from "@noshot/env/esm/decrypt";

// ENCRYPT (CJS)
const { encrypt } = require("@noshot/env/encrypt");
const encrypt = require("@noshot/env/encrypt").default;
// ENCRYPT (ESM)
import encrypt from "@noshot/env/encrypt";
import encrypt from "@noshot/env/esm/encrypt";
```

⚠️ Please note that for CommonJS imports (`require`) you'll need to import the `default` property for *default* exports. Unfortunately, this is a limitation of mixing ESM (which automatically imports `default`) and CJS imports (which doesn't). Alternatively, you can import (`require`) the named export instead.
