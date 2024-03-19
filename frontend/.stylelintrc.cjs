module.exports = {
    extends: [
        "stylelint-config-standard",
        "stylelint-config-recess-order",
    ],
    plugins: [
        "stylelint-use-nesting"
    ],
    rules: {
        "selector-max-id": 1,
        "csstools/use-nesting": "always",
    }
}
