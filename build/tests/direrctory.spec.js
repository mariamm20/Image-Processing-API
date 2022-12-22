"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var utilities_1 = require("../utilities");
var imageDir = (0, utilities_1.getImageDir)();
describe('Test Directory response', function () {
    it('test when resized file exists ', function () {
        var resizedFile = path_1.default.join(imageDir, 'resized');
        if (fs_1.default.existsSync(resizedFile)) {
            fs_1.default.mkdirSync(resizedFile, { recursive: true });
        }
    });
});
