'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"http://192.168.10.107:8094/v1"', //http://127.0.0.1:8094/v1   一鸣：192.168.10.167
})