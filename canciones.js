"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
var songSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    duration: { type: Number, required: true },
    artist: String,
});
// 3. Create a Model.
var Song = (0, mongoose_1.model)('Song', songSchema);
run().catch(function (err) { return console.log(err); });
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var songNameToCreate, existingSong, song, songFromDB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // 4. Connect to MongoDB
                return [4 /*yield*/, (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/test')];
                case 1:
                    // 4. Connect to MongoDB
                    _a.sent();
                    songNameToCreate = 'Marianela';
                    return [4 /*yield*/, Song.findOne({ name: songNameToCreate })];
                case 2:
                    existingSong = _a.sent();
                    if (!!existingSong) return [3 /*break*/, 4];
                    song = new Song({
                        name: songNameToCreate,
                        duration: 157,
                        artist: 'Sara'
                    });
                    return [4 /*yield*/, song.save()];
                case 3:
                    _a.sent();
                    console.log('Song created:', song);
                    return [3 /*break*/, 5];
                case 4:
                    console.log('Song with the same name already exists:', existingSong);
                    _a.label = 5;
                case 5: return [4 /*yield*/, Song.findOne({ name: 'Marianela' })];
                case 6:
                    songFromDB = _a.sent();
                    if (songFromDB) {
                        console.log('Song found:', songFromDB);
                    }
                    else {
                        console.log('Song not found.');
                    }
                    if (!songFromDB) return [3 /*break*/, 8];
                    songFromDB.duration = 180;
                    return [4 /*yield*/, songFromDB.save()];
                case 7:
                    _a.sent();
                    console.log('Song updated:', songFromDB);
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
