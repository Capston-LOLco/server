"use strict";
exports.__esModule = true;
exports.EncryptUtil = void 0;
var pbkdf2_1 = require("pbkdf2");
var crypto_1 = require("crypto");
var EncryptUtil = /** @class */ (function () {
    function EncryptUtil() {
    }
    EncryptUtil.prototype.encrypt = function (password) {
        var salt = (0, crypto_1.randomBytes)(256).toString('base64');
        var hash = (0, pbkdf2_1.pbkdf2Sync)(password, salt, 2048, 256, 'sha512').toString('base64');
        return [hash, salt];
    };
    return EncryptUtil;
}());
exports.EncryptUtil = EncryptUtil;
