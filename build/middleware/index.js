"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDimensions = exports.fileExits = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var index_1 = require("../utilities/index");
var imageDir = (0, index_1.getImageDir)();
//validate the existance of images file
var fileExits = function (req, res, next) {
    var filename = req.query.filename;
    if (filename) {
        if (fs_1.default.existsSync(path_1.default.join(imageDir, filename + '.jpg'))) {
            next();
        }
        else {
            res.status(404).send('file not found');
        }
    }
    else {
        res.status(400).send('filename query is required');
    }
};
exports.fileExits = fileExits;
//validate dimenions 
var validateDimensions = function (req, res, next) {
    var _a = req.query, height = _a.height, width = _a.width;
    var heightNumber = parseInt(height);
    var widthNumber = parseInt(width);
    var sendnext = true;
    if (widthNumber <= 0 || (width && !widthNumber)) {
        res.status(400).send('width must be a number greater than 0');
        sendnext = false;
    }
    if (heightNumber < 0 || (height && !heightNumber)) {
        res.status(400).send('height must be greater than 0');
        sendnext = false;
    }
    if (sendnext) {
        next();
    }
};
exports.validateDimensions = validateDimensions;
