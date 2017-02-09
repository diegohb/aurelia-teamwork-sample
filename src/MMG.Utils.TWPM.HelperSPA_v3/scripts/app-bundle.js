define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
            this.message = 'Hello World!';
        }
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('models/account',["require", "exports"], function (require, exports) {
    "use strict";
    var Account = (function () {
        function Account() {
        }
        Object.defineProperty(Account.prototype, "endpointURI", {
            get: function () {
                return "account.json";
            },
            enumerable: true,
            configurable: true
        });
        Account.parse = function (pRawData) {
            var data = pRawData.account || pRawData;
            var obj = new Account();
            obj.requireHttps = data["requirehttps"] === true;
            obj.timeTrackingEnabled = data["time-tracking-enabled"] === true;
            obj.name = data["name"];
            obj.dateSignedUp = data["datesignedup"];
            obj.companyname = data["companyname"];
            obj.sslEnabled = data["ssl-enabled"] === true;
            obj.createdAt = data["created-at"];
            obj.cacheUUID = data["cacheUUID"];
            obj.accountHolderID = parseInt(data["account-holder-id"]);
            obj.logo = data["logo"];
            obj.userID = parseInt(data["id"]);
            obj.accountURL = data["URL"];
            obj.emailNotificationEnabled = data["email-notification-enabled"] === true;
            obj.companyID = parseInt(data["companyid"]);
            obj.lang = data["lang"];
            obj.code = data["code"];
            return obj;
        };
        return Account;
    }());
    exports.Account = Account;
});

define('models/auth-info',["require", "exports"], function (require, exports) {
    "use strict";
    var AuthUserInfo = (function () {
        function AuthUserInfo() {
        }
        Object.defineProperty(AuthUserInfo.prototype, "endpointURI", {
            get: function () {
                return "authenticate.json";
            },
            enumerable: true,
            configurable: true
        });
        AuthUserInfo.parse = function (pRawData) {
            var data = pRawData.account || pRawData;
            var obj = new AuthUserInfo();
            obj.installURL = data["URL"];
            obj.companyID = parseInt(data["companyid"]);
            obj.companyName = data["companyname"];
            obj.dateFormat = data["dateFormat"];
            obj.accountID = parseInt(data["id"]);
            obj.userID = parseInt(data["userId"]);
            obj.firstName = data.firstname;
            obj.lastName = data.lastname;
            obj.avatarUrl = data["avatar-url"];
            return obj;
        };
        return AuthUserInfo;
    }());
    exports.AuthUserInfo = AuthUserInfo;
});

define('models/company',["require", "exports"], function (require, exports) {
    "use strict";
    var Company = (function () {
        function Company() {
        }
        Object.defineProperty(Company.prototype, "endpointURI", {
            get: function () {
                return "companies/" + this.companyID + ".json";
            },
            enumerable: true,
            configurable: true
        });
        Company.parse = function (pRawData) {
            var data = pRawData.company || pRawData;
            var obj = new Company();
            obj.companyID = parseInt(data.id);
            obj.name = data.name;
            return obj;
        };
        return Company;
    }());
    exports.Company = Company;
});

define('models/person',["require", "exports"], function (require, exports) {
    "use strict";
    var Person = (function () {
        function Person() {
        }
        Object.defineProperty(Person.prototype, "endpointURI", {
            get: function () {
                return "people/" + this.personID + ".json";
            },
            enumerable: true,
            configurable: true
        });
        Person.parse = function (pRawData) {
            var data = pRawData.person || pRawData;
            var obj = new Person();
            obj.personID = parseInt(data["id"]);
            obj.firstName = data["first-name"];
            obj.lastName = data["last-name"];
            obj.email = data["email-address"];
            obj.title = data["title"];
            obj.avatarUrl = data["avatar-url"];
            obj.companyID = parseInt(data["company-id"]);
            obj.isAdmin = data.administrator === true;
            obj.lastLogin = data["last-login"];
            return obj;
        };
        return Person;
    }());
    exports.Person = Person;
});

define('models/priority',["require", "exports"], function (require, exports) {
    "use strict";
    var Priority;
    (function (Priority) {
        Priority[Priority["Low"] = 0] = "Low";
        Priority[Priority["Medium"] = 1] = "Medium";
        Priority[Priority["High"] = 2] = "High";
    })(Priority = exports.Priority || (exports.Priority = {}));
});

define('models/project',["require", "exports", "./company"], function (require, exports, company_1) {
    "use strict";
    var Project = (function () {
        function Project() {
        }
        Object.defineProperty(Project.prototype, "endpointURI", {
            get: function () {
                return "projects/" + this.projectID + ".json";
            },
            enumerable: true,
            configurable: true
        });
        Project.parse = function (pRawData) {
            var data = pRawData.project || pRawData;
            var obj = new Project();
            obj.projectID = parseInt(data.id);
            obj.name = data.name;
            obj.lastModified = data["last-changed-on"];
            obj.dateCreated = data["created-on"];
            obj.endDate = data.endDate;
            if (data.company) {
                obj.company = company_1.Company.parse(data.company);
            }
            return obj;
        };
        return Project;
    }());
    exports.Project = Project;
});

define('models/tag',["require", "exports"], function (require, exports) {
    "use strict";
    var Tag = (function () {
        function Tag() {
        }
        Object.defineProperty(Tag.prototype, "endpointURI", {
            get: function () {
                return "tags/" + this.tagID;
            },
            enumerable: true,
            configurable: true
        });
        Tag.parse = function (pRawData) {
            var data = pRawData.tag || pRawData;
            var obj = new Tag();
            obj.tagID = parseInt(data["id"]);
            obj.name = data["name"];
            obj.color = data["color"];
            return obj;
        };
        return Tag;
    }());
    exports.Tag = Tag;
});

define('models/task',["require", "exports", "./tag"], function (require, exports, tag_1) {
    "use strict";
    var Task = (function () {
        function Task(data) {
            this.canComplete = data["canComplete"] === true;
            this.projectID = parseInt(data["project-id"]);
            this.creatorLastName = data["creator-lastname"];
            this.hasReminders = data["has-reminders"] === true;
            this.taskListName = data["todo-list-name"];
            this.hasUnreadComments = data["has-unread-comments"] === true;
            this.dueDateBase = data["due-date-base"];
            this.ordinal = parseInt(data["order"]);
            this.commentsCount = data["comments-count"];
            this.privateVal = data["private"];
            this.status = data["status"];
            this.taskListID = parseInt(data["todo-list-id"]);
            this.predecessors = data["predecessors"];
            this.createdOn = data["created-on"];
            this.canEdit = data["canEdit"] === true;
            this.title = data["content"];
            this.hasPredecessors = data["has-predecessors"];
            this.companyName = data["company-name"];
            this.taskID = parseInt(data["id"]);
            this.creatorFirstname = data["creator-firstname"];
            this.lastChangedOn = data["last-changed-on"];
            this.dueDate = data["due-date"];
            this.hasDependencies = data["has-dependencies"];
            this.isCompleted = data["completed"] === true;
            this.attachmentCount = data["attachments-count"];
            this.estimateMinutes = data["estimated-minutes"];
            this.description = data["description"];
            this.priority = data["priority"];
            this.progress = data["progress"];
            this.canViewEstimatedTime = data["viewEstimatedTime"];
            this.parentTaskID = parseInt(data["parentTaskId"]);
            this.companyID = parseInt(data["company-id"]);
            this.creatorAvatarURL = data["creator-avatar-url"];
            this.creatorID = parseInt(data["creator-id"]);
            this.projectName = data["project-name"];
            this.attachments = data["attachments"];
            this.assigneeID = data["responsible-party-ids"];
            this.assigneeName = data["responsible-party-names"];
            this.assigneeSummary = data["responsible-party-summary"];
            this.startDate = data["start-date"];
            if (data["tags"])
                this.tags = data["tags"].map(function (tagData) { return tag_1.Tag.parse(tagData); });
            else
                this.tags = [];
        }
        return Task;
    }());
    exports.Task = Task;
});

define('models/twfile',["require", "exports"], function (require, exports) {
    "use strict";
    var TWFile = (function () {
        function TWFile() {
        }
        Object.defineProperty(TWFile.prototype, "endpointURI", {
            get: function () {
                return "files/" + this.fileID;
            },
            enumerable: true,
            configurable: true
        });
        TWFile.parse = function (pRawData, pBaseURL) {
            var data = pRawData.file || pRawData;
            var obj = new TWFile();
            obj.fileID = parseInt(data["id"]);
            obj.fileName = data["name"];
            obj.projectID = data["project-id"];
            obj.categoryName = data["category-name"];
            obj.downloadURL = data["download-URL"];
            if (pBaseURL) {
                if (!pBaseURL.endsWith("/"))
                    pBaseURL += "/";
                obj.teamworkFileURL = "" + pBaseURL + obj.endpointURI;
            }
            return obj;
        };
        return TWFile;
    }());
    exports.TWFile = TWFile;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('twpm/twpm-client-factory',["require", "exports", "aurelia-framework", "aurelia-fetch-client"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1) {
    "use strict";
    var TWPMClientFactory = (function () {
        function TWPMClientFactory(apiClient) {
            this.apiClient = apiClient;
            this._baseURL = "";
        }
        Object.defineProperty(TWPMClientFactory.prototype, "baseURL", {
            get: function () { return this._baseURL; },
            set: function (value) { this._baseURL = value; },
            enumerable: true,
            configurable: true
        });
        TWPMClientFactory.prototype.createApiClient = function (pApiToken) {
            var _this = this;
            var base64Auth = this.getEncodedAuthString(pApiToken);
            return this.apiClient.configure(function (config) {
                if (_this.baseURL)
                    config.withBaseUrl(_this.baseURL);
                config.withDefaults({
                    headers: {
                        "Accept": "application/json",
                        "Authorization": "BASIC " + base64Auth
                    }
                });
            });
        };
        TWPMClientFactory.prototype.getEncodedAuthString = function (pApiToken) {
            var authKey = pApiToken + ":password";
            return btoa(authKey);
        };
        return TWPMClientFactory;
    }());
    TWPMClientFactory = __decorate([
        aurelia_framework_1.singleton(),
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
    ], TWPMClientFactory);
    exports.TWPMClientFactory = TWPMClientFactory;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('twpm/auth-state',["require", "exports", "aurelia-dependency-injection", "./twpm-client-factory"], function (require, exports, aurelia_dependency_injection_1, twpm_client_factory_1) {
    "use strict";
    var AuthState = (function () {
        function AuthState(pClientFactory) {
            this.apiToken = "";
            this.clientFactory = pClientFactory;
        }
        AuthState.prototype.isAuthenticated = function () {
            return this.userInfo != null;
        };
        AuthState.prototype.validateApiToken = function (pApiToken, pAuthUser) {
            if (!this.isApiTokenValid(pApiToken))
                throw new Error("Api token cannot be empty!");
            if (!pAuthUser || !pAuthUser.installURL)
                throw new Error("A valid AuthUserInfo object with a valid installURL must be provided!");
            this.apiToken = pApiToken;
            this.userInfo = pAuthUser;
            this.clientFactory.baseURL = pAuthUser.installURL;
        };
        AuthState.prototype.ensureAuthenticated = function () {
            if (!this.isAuthenticated())
                throw new Error("Not authenticated with TeamworkPM!");
        };
        AuthState.prototype.reset = function () {
            if (!this.isAuthenticated())
                return;
            this.apiToken = "";
            this.userInfo = null;
            this.clientFactory.baseURL = "";
        };
        AuthState.prototype.getInstallUrl = function () {
            return this.userInfo.installURL;
        };
        AuthState.prototype.isApiTokenValid = function (pApiToken) {
            return pApiToken && pApiToken.trim().length >= 0;
        };
        return AuthState;
    }());
    AuthState = __decorate([
        aurelia_dependency_injection_1.singleton(),
        aurelia_dependency_injection_1.autoinject(),
        __metadata("design:paramtypes", [twpm_client_factory_1.TWPMClientFactory])
    ], AuthState);
    exports.AuthState = AuthState;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('twpm/twpm-auth',["require", "exports", "aurelia-framework", "./twpm-client-factory", "./auth-state", "../models/auth-info"], function (require, exports, aurelia_framework_1, twpm_client_factory_1, auth_state_1, auth_info_1) {
    "use strict";
    var TWPMAuthService = (function () {
        function TWPMAuthService(pClientFactory, authState) {
            this.authState = authState;
            this.clientFactory = pClientFactory;
        }
        TWPMAuthService.prototype.authenticate = function (pApiToken) {
            var _this = this;
            this.httpClient = this.clientFactory.createApiClient(pApiToken);
            return this.getAuthUserInfo()
                .then(function (pAuthInfo) {
                _this.authState.validateApiToken(pApiToken, pAuthInfo);
                return {
                    Success: true,
                    Account: pAuthInfo
                };
            }).catch(function (err) {
                return { Success: false, ErrorMessage: err.message, Error: err };
            });
        };
        TWPMAuthService.prototype.getAuthUserInfo = function () {
            return this.httpClient.fetch("https://authenticate.teamwork.com/authenticate.json")
                .then(function (pResponse) {
                if (!pResponse.ok)
                    throw new Error("Bad request to TeamworkPM.");
                var promiseData = pResponse.json();
                return promiseData.then(function (pData) { return auth_info_1.AuthUserInfo.parse(pData.account); });
            }).catch(function (err) {
                var translatedError;
                switch (err.statusCode) {
                    case 401:
                        translatedError = new Error("Invalid API Token!");
                        break;
                    default:
                        translatedError = new Error("Unspecified error - " + err.statusText);
                        break;
                }
                return Promise.reject(translatedError);
            });
        };
        TWPMAuthService.prototype.endAuthSession = function () {
            this.authState.reset();
            console.log("Logged out and reset AuthState!");
        };
        return TWPMAuthService;
    }());
    TWPMAuthService = __decorate([
        aurelia_framework_1.autoinject(),
        __metadata("design:paramtypes", [twpm_client_factory_1.TWPMClientFactory, auth_state_1.AuthState])
    ], TWPMAuthService);
    exports.TWPMAuthService = TWPMAuthService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
define('twpm/twpm-svc',["require", "exports", "aurelia-framework", "./twpm-client-factory", "./auth-state", "../models/project", "../models/task", "../models/person", "../models/twfile"], function (require, exports, aurelia_framework_1, twpm_client_factory_1, auth_state_1, project_1, task_1, person_1, twfile_1) {
    "use strict";
    var TWPMService = (function () {
        function TWPMService(pClientFactory, authState) {
            this.authState = authState;
            this.apiClient = pClientFactory.createApiClient(this.authState.apiToken);
        }
        TWPMService.prototype.fetchPerson = function (pPersonID) {
            return __awaiter(this, void 0, void 0, function () {
                var personID;
                return __generator(this, function (_a) {
                    personID = pPersonID || this.authState.userInfo.userID;
                    return [2 /*return*/, this.apiClient.fetch("people/" + personID + ".json")
                            .then(this.getJson).then(function (pData) {
                            return person_1.Person.parse(pData);
                        })];
                });
            });
        };
        TWPMService.prototype.fetchPeople = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.apiClient.fetch("people.json")
                            .then(this.getJson).then(function (pData) {
                            var materializedPeople = pData.people.map(function (pPersonRaw) { return person_1.Person.parse(pPersonRaw); });
                            return materializedPeople;
                        })];
                });
            });
        };
        TWPMService.prototype.fetchAllProjects = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.apiClient.fetch("projects.json").then(function (pResponse) {
                                if (pResponse.ok)
                                    return _this.getJson(pResponse);
                                return Promise.reject(pResponse.error());
                            })
                                .then(function (pData) {
                                return pData.projects.map(function (pItem) { return project_1.Project.parse(pItem); });
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        TWPMService.prototype.fetchProjectByID = function (pProjectID) {
            return __awaiter(this, void 0, void 0, function () {
                var requestURL;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestURL = "projects/" + pProjectID + ".json";
                            return [4 /*yield*/, this.apiClient.fetch(requestURL).then(this.getJson)
                                    .then(function (pData) {
                                    return project_1.Project.parse(pData.project);
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        TWPMService.prototype.fetchTasks = function (pPartyID) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var partyID, requestURL;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            partyID = pPartyID || this.authState.userInfo.userID;
                            requestURL = "tasks.json?responsible-party-ids=" + partyID + "&filter=today&sort=duedate";
                            return [4 /*yield*/, this.apiClient.fetch(requestURL)
                                    .then(function (response) {
                                    if (!response.ok)
                                        throw new Error("Bad request from TeamworkPM.");
                                    return _this.getJson(response).then(function (pData) {
                                        var items = pData["todo-items"];
                                        return items.map(function (pItem) { return new task_1.Task(pItem); });
                                    });
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        TWPMService.prototype.fetchTasksByTag = function (pTags) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var requestURL;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestURL = "tasks.json?tag-ids=" + pTags.join(",") + "&sort=duedate&includeCompletedTasks=true";
                            return [4 /*yield*/, this.apiClient.fetch(requestURL)
                                    .then(function (response) {
                                    if (!response.ok)
                                        throw new Error("Bad request from TeamworkPM.");
                                    return _this.getJson(response).then(function (pData) {
                                        var items = pData["todo-items"];
                                        return items.map(function (pItem) { return new task_1.Task(pItem); });
                                    });
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        TWPMService.prototype.fetchTasksByProject = function (pProjectID) {
            return __awaiter(this, void 0, void 0, function () {
                var requestURL;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestURL = "projects/" + pProjectID + "/tasks.json?includeCompletedTasks=true";
                            return [4 /*yield*/, this.apiClient.fetch(requestURL).then(this.getJson)
                                    .then(function (pData) {
                                    var rawTasks = pData["todo-items"];
                                    return rawTasks.map(function (pItem) { return new task_1.Task(pItem); });
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        TWPMService.prototype.fetchFilesByProject = function (pProjectID) {
            return __awaiter(this, void 0, void 0, function () {
                var requestURL, installURL;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestURL = "projects/" + pProjectID + "/files.json";
                            installURL = this.authState.getInstallUrl();
                            return [4 /*yield*/, this.apiClient.fetch(requestURL).then(this.getJson)
                                    .then(function (pData) {
                                    var rawFiles = pData.project.files;
                                    return rawFiles.map(function (pItem) { return twfile_1.TWFile.parse(pItem, installURL); });
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        TWPMService.prototype.getJson = function (pResponse) {
            return pResponse.json();
        };
        return TWPMService;
    }());
    TWPMService = __decorate([
        aurelia_framework_1.transient(),
        aurelia_framework_1.autoinject(),
        __metadata("design:paramtypes", [twpm_client_factory_1.TWPMClientFactory, auth_state_1.AuthState])
    ], TWPMService);
    exports.TWPMService = TWPMService;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template><h1>${message}</h1></template>"; });
//# sourceMappingURL=app-bundle.js.map