import {Task} from "app/models/task";
import {Tag} from "app/models/tag";

export class ListTaskItemVM {
    private _projectID: number;
    private _projectName: string;
    private _taskListID: number;
    private _taskListName: string;
    private _taskID: number;
    private _taskName: string;
    private _tags: Array<Tag>;
    private _predecessors: Array<any>;
    private _twpmBaseURL: string;
    private _isCompleted: boolean;
    private _assigneeDescription: string;

    constructor (pTask: Task, pBaseUrl: string) {
        this._twpmBaseURL = pBaseUrl;
        this._projectID = pTask.projectID;
        this._projectName = pTask.projectName;
        this._taskListID = pTask.taskListID;
        this._taskListName = pTask.taskListName;
        this._taskID = pTask.taskID;
        this._taskName = pTask.title;
        this._predecessors = pTask.predecessors || [];
        this._tags = pTask.tags;
        this._isCompleted = pTask.isCompleted;
        this._assigneeDescription = pTask.assigneeSummary;
    }

    get ProjectName (): string { return this._projectName; }

    get ProjectLinkURL (): string {
        return `${this._twpmBaseURL}projects/${this._projectID}`;
    }

    get TaskListName (): string { return this._taskListName; }

    get TaskListLinkURL (): string {
        return `${this._twpmBaseURL}tasklists/${this._taskListID}`;
    }

    get TaskName (): string { return this._taskName; }

    get TaskLinkURL (): string {
        return `${this._twpmBaseURL}tasks/${this._taskID}`;
    }

    get Tags (): Array<Tag> { return this._tags; }

    get Status (): string {
        if (this._isCompleted) {
            return "Completed";
        } else if (this._predecessors.length > 0) {
            return `Blocked by ${this._predecessors.length} tasks.`;
        } else {
            return "Incomplete";
        }
    }

    get AssigneeDisplay (): string {
        return this._assigneeDescription;
    }

    get TaskPDF (): string {
        return `https://tw-pdf.teamworkpm.net/?tw_i=69265&tw_u=22762&tw_key=EC836043B06FC0DE005F95515F8D2747&action=Task_DownloadPrintPDF&id=${this._taskID}&includeSubTasks=1`;
    }

    public createURL (): string {
        var data = this._predecessors.map(p => `[${p.id}{bg:red}]` + `->[${this._taskID}{bg:blue}]`);
        /*var blockingTasks = taskNames.join("->");
        var combined = blockingTasks + ;*/
        return `http://yuml.me/diagram/scruffy/class/${data}`;
    }
}