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

define('text!app.html', ['module'], function(module) { module.exports = "<template><h1>${message}</h1></template>"; });
//# sourceMappingURL=app-bundle.js.map