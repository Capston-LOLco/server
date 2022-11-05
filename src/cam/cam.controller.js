"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.CamController = void 0;
var common_1 = require("@nestjs/common");
var CamController = /** @class */ (function () {
    function CamController(camService) {
        this.camService = camService;
        this.camService = camService;
    }
    CamController.prototype.create = function (createCamDto) {
        return this.camService.create(createCamDto);
    };
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], CamController.prototype, "create");
    CamController = __decorate([
        (0, common_1.Controller)('cam')
    ], CamController);
    return CamController;
}());
exports.CamController = CamController;
