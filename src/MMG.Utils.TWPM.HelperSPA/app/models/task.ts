import {Priority} from "priority";
import {Tag} from "app/models/tag";

export class Task {

    constructor (data: any) {
        this.canComplete = data["canComplete"];
        this.projectID = data["project-id"];
        this.creatorLastName = data["creator-lastname"];
        this.hasReminders = data["has-reminders"];
        this.taskListName = data["todo-list-name"];
        this.hasUnreadComments = data["has-unread-comments"];
        this.dueDateBase = data["due-date-base"];
        this.ordinal = data["order"];
        this.commentsCount = data["comments-count"];
        this.privateVal = data["private"];
        this.status = data["status"];
        this.taskListID = data["todo-list-id"];
        this.predecessors = data["predecessors"];
        this.createdOn = data["created-on"];
        this.canEdit = data["canEdit"];
        this.title = data["content"];
        this.hasPredecessors = data["has-predecessors"];
        this.companyName = data["company-name"];
        this.ID = data["id"];
        this.creatorFirstname = data["creator-firstname"];
        this.lastChangedOn = data["last-changed-on"];
        this.dueDate = data["due-date"]; //e.g. "20140405"
        this.hasDependencies = data["has-dependencies"];
        this.isCompleted = data["completed"];
        this.attachmentCount = data["attachments-count"];
        this.estimateMinutes = data["estimated-minutes"];
        this.description = data["description"];
        this.priority = data["priority"];
        this.progress = data["progress"];
        this.canViewEstimatedTime = data["viewEstimatedTime"];
        this.parentTaskID = data["parentTaskId"];
        this.companyID = data["company-id"];
        this.creatorAvatarURL = data["creator-avatar-url"];
        this.creatorID = data["creator-id"];
        this.projectName = data["project-name"];
        this.attachments = data["attachments"];
        this.assigneeID = data["responsible-party-ids"]; //e.g. "1,2",
        this.assigneeName = data["responsible-party-names"]; //e.g. "Daniel M.|Peter C.",
        this.assigneeSummary = data["responsible-party-summary"]; //e.g. "You & Peter C."
        this.startDate = data["start-date"]; //e.g. ""20140402"
        if (data["tags"])
            this.tags = data["tags"].map(tagData => new Tag(tagData));
        else
            this.tags = [];
    }

    //ref: http://developer.teamwork.com/datareference#todo_item

    canComplete: boolean;
    assigneeSummary: string;
    assigneeName: string;
    assigneeID: number;
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
    lastChangedOn: Date;
    creatorFirstname: string;
    ID: number;
    companyName: string;
    hasPredecessors: number;
    title: string;
    canEdit: boolean;
    createdOn: Date;
    predecessors;
    taskListID: number;
    status: string;
    privateVal: number;
    commentsCount: number;
    ordinal: number;
    dueDateBase: string;
    hasUnreadComments;
    taskListName: string;
    hasReminders: boolean;
    creatorLastName: string;
    projectID: number;
    startDate: string;
    tags: Array<Tag>;
}