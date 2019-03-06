module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "amd": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-console": "error",
        "no-var": 1,
        "no-eval": "error",
        "indent": ["error", 2],
        "quotes": ["error", "single"],
        "space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "always",
            "asyncArrow": "always"
        }],
        "prefer-arrow-callback": [0, { "allowNamedFunctions": true }],
        "func-names": ["error", "never"]
    }

};