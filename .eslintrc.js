module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": ["airbnb-base", "prettier", "plugin:node/recommended"],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest", 
        "sourceType": "module"
    },
    "rules": {
    // eslint-disable-next-line no-bitwise
    "import/prefer-default-export": "off" | "warn" | "error"
}
}
