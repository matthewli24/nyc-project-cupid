"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var playwright_1 = require("playwright");
var models_1 = require("./models");
var availableTimeSlots = {
    Manhattan: [],
    Queens: [],
    Bronx: [],
    Brooklyn: [],
    StatenIsland: []
};
var scrapWebsite = function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, context, page, url, _i, _a, _b, key, value, location_1, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, playwright_1.chromium.launch({ headless: true })];
            case 1:
                browser = _d.sent();
                ;
                return [4 /*yield*/, browser.newContext()];
            case 2:
                context = _d.sent();
                ;
                return [4 /*yield*/, context.newPage()];
            case 3:
                page = _d.sent();
                url = 'https://clerkscheduler.cityofnewyork.us/s/MarriageCeremony';
                return [4 /*yield*/, page.goto(url)];
            case 4:
                _d.sent();
                _i = 0, _a = Object.entries(models_1.OfficeLocations);
                _d.label = 5;
            case 5:
                if (!(_i < _a.length)) return [3 /*break*/, 18];
                _b = _a[_i], key = _b[0], value = _b[1];
                location_1 = key;
                _c = value;
                switch (_c) {
                    case models_1.OfficeLocations.Manhattan: return [3 /*break*/, 6];
                    case models_1.OfficeLocations.Queens: return [3 /*break*/, 8];
                    case models_1.OfficeLocations.Brooklyn: return [3 /*break*/, 10];
                    case models_1.OfficeLocations.Bronx: return [3 /*break*/, 12];
                    case models_1.OfficeLocations.StatenIsland: return [3 /*break*/, 14];
                }
                return [3 /*break*/, 16];
            case 6: return [4 /*yield*/, extractTimeSlots(location_1, value, page, availableTimeSlots)
                    .then(function (res) { return availableTimeSlots = res; })];
            case 7:
                _d.sent();
                return [3 /*break*/, 17];
            case 8: return [4 /*yield*/, extractTimeSlots(location_1, value, page, availableTimeSlots)
                    .then(function (res) { return availableTimeSlots = res; })];
            case 9:
                _d.sent();
                return [3 /*break*/, 17];
            case 10: return [4 /*yield*/, extractTimeSlots(location_1, value, page, availableTimeSlots)
                    .then(function (res) { return availableTimeSlots = res; })];
            case 11:
                _d.sent();
                return [3 /*break*/, 17];
            case 12: return [4 /*yield*/, extractTimeSlots(location_1, value, page, availableTimeSlots)
                    .then(function (res) { return availableTimeSlots = res; })];
            case 13:
                _d.sent();
                return [3 /*break*/, 17];
            case 14: return [4 /*yield*/, extractTimeSlots(location_1, value, page, availableTimeSlots)
                    .then(function (res) { return availableTimeSlots = res; })];
            case 15:
                _d.sent();
                return [3 /*break*/, 17];
            case 16:
                {
                    console.error('Office does not exist!');
                    return [3 /*break*/, 17];
                }
                _d.label = 17;
            case 17:
                _i++;
                return [3 /*break*/, 5];
            case 18:
                console.log(availableTimeSlots);
                return [4 /*yield*/, context.close()];
            case 19:
                _d.sent();
                return [4 /*yield*/, browser.close()];
            case 20:
                _d.sent();
                return [2 /*return*/];
        }
    });
}); };
var extractTimeSlots = function (location, office, page, timeslots) { return __awaiter(void 0, void 0, void 0, function () {
    var noAppointmentsText, isAvailable, newTimeSlotFound, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.click('[placeholder="Select Office Location"]')];
            case 1:
                _a.sent();
                return [4 /*yield*/, page.click("span:has-text('".concat(office, "')"))];
            case 2:
                _a.sent();
                noAppointmentsText = 'All available appointments have been booked. We load new appointments frequently. Check back soon.';
                return [4 /*yield*/, page.textContent('p.slds-text-color_error')];
            case 3:
                isAvailable = (_a.sent()) !== noAppointmentsText;
                // TODO
                if (true || isAvailable) {
                    newTimeSlotFound = [
                        { date: 'Jan 11', times: ['11:00 AM', '12:00 PM', '1:00 PM'] },
                        { date: 'Jan 12', times: ['2:00 AM', '2:30 PM', '3:00 PM'] },
                        { date: 'Jan 13', times: ['8:00 AM', '8:30 AM', '8:45 AM'] },
                        { date: 'Jan 14', times: ['1:00 PM', '2:00 PM', '3:00 PM'] },
                        { date: 'Jan 15', times: ['10:15 AM', '12:15 PM', '1:11 PM'] }
                    ];
                    result = __assign({}, timeslots);
                    result[location] = __spreadArray([], newTimeSlotFound, true);
                    return [2 /*return*/, result];
                }
                return [2 /*return*/, timeslots];
        }
    });
}); };
var scrapeAPI = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, _a, _b, key, value, location_2, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _i = 0, _a = Object.entries(models_1.LocationIds);
                _d.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                _b = _a[_i], key = _b[0], value = _b[1];
                location_2 = key;
                _c = key;
                switch (_c) {
                    case models_1.Location.Manhattan: return [3 /*break*/, 2];
                }
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, postRequest(getFormData(value))];
            case 3:
                _d.sent();
                _d.label = 4;
            case 4:
                {
                    console.error('Location does not exist!');
                    return [3 /*break*/, 5];
                }
                _d.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); };
var getFormData = function (id) {
    return {
        'aura.context': '{"mode":"PROD","fwuid":"7FPkrq_-upw5gdD4giTZpg","app":"siteforce:communityApp","loaded":{"APPLICATION@markup://siteforce:communityApp":"B78-aNM4IDOksLJusJF3g"},"dn":[],"globals":{},"uad":false}',
        'aura.pageURI': '/s/MarriageCeremony',
        'aura.token': 'undefined',
        'message': "{\"actions\":[{\"id\":\"999;a\",\"descriptor\":\"aura://ApexActionController/ACTION$execute\",\"callingDescriptor\":\"UNKNOWN\",\"params\":{\"namespace\":\"\",\"classname\":\"SCHED_BookAppointmentController\",\"method\":\"getSlots\",\"params\":{\"isDeviceMobile\":false,\"isCeremonyFlow\":true,\"isLicenseFlow\":false,\"isDomesticFlow\":false,\"isCertificateOfNonImpediment\":false,\"isRecordsRoom\":false,\"isMarriageOfficiantRegistration\":false,\"isPageLoad\":true,\"isDateChanged\":false,\"isWeekChanged\":false,\"weekAction\":null,\"locationId\":\"".concat(id, "\",\"selectedDate\":null,\"selectedSlotId\":null,\"selectedSlotData\":\"null\"},\"cacheable\":false,\"isContinuation\":false}}]}")
    };
};
var postRequest = function (formData) { return __awaiter(void 0, void 0, void 0, function () {
    var url, headers, context;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = 'https://clerkscheduler.cityofnewyork.us';
                headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Origin': 'https://clerkscheduler.cityofnewyork.us',
                    'Referer': 'https://clerkscheduler.cityofnewyork.us/s/MarriageCeremony'
                };
                return [4 /*yield*/, playwright_1.request.newContext({
                        baseURL: url
                    })];
            case 1:
                context = _a.sent();
                return [4 /*yield*/, context.post('/s/sfsites/aura', { headers: headers, form: formData })];
            case 2: return [4 /*yield*/, (_a.sent()).json()
                    .then(function (response) { return handleResponse(response); })["catch"](function (err) { return console.log('Error: ', err); })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var handleResponse = function (response) {
    console.log('&', response);
    var actions = response.actions;
    var outterValue = actions[0].returnValue;
    var innerValue = outterValue.returnValue;
    if (innerValue && !innerValue.noSlotsAvailable) {
        var daySlotsColumns = innerValue.daySlotsColumns;
        console.log('$', innerValue);
        // TODO reduce func here
    }
};
// scrapWebsite();
scrapeAPI();
