import {Priority} from "./priority";
import {Tag} from "./tag";

export class Task {

    canComplete: boolean;
    assigneeSummary: string;
    assigneeName: string;
    assigneeID: string;
    attachments: Array<any>;
    projectName: string;
    creatorID: number;
    creatorAvatarURL: string;
    companyID: number;
    parentTaskID: number;
    canViewEstimatedTime: boolean;
    progress: number;
    priority: Priority;
    description: string;
    estimateMinutes: number;
    attachmentCount: number;
    isCompleted: boolean;
    hasDependencies: number;
    dueDate: string;
    lastChangedOn: any;
    creatorFirstname: string;
    taskID: number;
    companyName: string;
    hasPredecessors: number;
    title: string;
    canEdit: boolean;
    createdOn: any;
    predecessors: Array<any>;
    taskListID: number;
    status: string;
    privateVal: number;
    commentsCount: number;
    ordinal: number;
    dueDateBase: string;
    hasUnreadComments: boolean;
    taskListName: string;
    hasReminders: boolean;
    creatorLastName: string;
    projectID: number;
    startDate: string;
    tags: Array<Tag>;

    constructor (data: any) {
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
        this.createdOn = data["created-on"]; //TODO: moment
        this.canEdit = data["canEdit"] === true;
        this.title = data["content"];
        this.hasPredecessors = data["has-predecessors"];
        this.companyName = data["company-name"];
        this.taskID = parseInt(data["id"]);
        this.creatorFirstname = data["creator-firstname"];
        this.lastChangedOn = data["last-changed-on"]; //TODO: moment
        this.dueDate = data["due-date"]; //e.g. "20140405"
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
        this.assigneeID = data["responsible-party-ids"]; //e.g. "1,2",
        this.assigneeName = data["responsible-party-names"]; //e.g. "Daniel M.|Peter C.",
        this.assigneeSummary = data["responsible-party-summary"]; //e.g. "You & Peter C."
        this.startDate = data["start-date"]; //e.g. "20140402"
        if (data["tags"])
            this.tags = data["tags"].map(tagData => Tag.parse(tagData));
        else
            this.tags = [];
    }
}

/*
 * {
    "todo-item": {
        "canComplete": true,
        "project-id": "23097",
        "creator-lastname": "User",
        "has-reminders": false,
        "todo-list-name": "Todos",
        "has-unread-comments": false,
        "due-date-base": "20140405",
        "order": "1002",
        "comments-count": "2",
        "private": "0",
        "status": "reopened",
        "todo-list-id": "58759",
        "predecessors": [],
        "created-on": "2014-04-01T15:52:15Z",
        "canEdit": true,
        "content": "Write documentation",
        "has-predecessors": "0",
        "company-name": "Demo 1 Company",
        "id": "999",
        "creator-firstname": "Demo",
        "last-changed-on": "2014-04-02T11:05:19Z",
        "due-date": "20140405",
        "has-dependencies": "0",
        "completed": false,
        "position": "1002",
        "attachments-count": "0",
        "estimated-minutes": "0",
        "description": "",
        "priority": "",
        "progress": "0",
        "harvest-enabled": false,
        "viewEstimatedTime": true,
        "parentTaskId": "",
        "company-id": "2",
        "tasklist-lockdownId": "",
        "creator-avatar-url": "http://sitename.teamwork.com/images/avatar.jpg",
        "canLogTime": true,
        "creator-id": "28726",
        "project-name": "demo",
        "attachments": [],
        "responsible-party-ids": "1,2",
        "responsible-party-names": "Daniel M.|Peter C.",
        "responsible-party-summary": "You & Peter C.",
        "start-date": "20140402",
        "tasklist-private": "0",
        "timeIsLogged": "0",
        "lockdownId": "",
        "tags": [
            {
                "id": 5,
                "name": "api",
                "color": "#b1da34"
            },
            {
                "id": 4,
                "name": "documentation",
                "color": "#A9C3F9"
            }
        ]
    }
}
 */