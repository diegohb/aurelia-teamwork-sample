export class TWFile {
    fileID: number;
    fileName: string;
    projectID: number;
    categoryName: string;
    downloadURL: string;

    get endpointURI (): string {
        return `tags/${this.fileID}`;
    }

    static parse (pRawData: any): TWFile {
        let data = pRawData.file || pRawData;
        let obj = new TWFile();
        obj.fileID = parseInt(data["id"]);
        obj.fileName = data["name"];
        obj.projectID = data["project-id"];
        obj.categoryName = data["category-name"];
        obj.downloadURL = data["download-URL"];
        return obj;
    }
}

/*
 * {
    "file": {
        "project-id": "999",
        "uploaded-by-user-last-name": "User",
        "name": "readme.txt",
        "uploaded-date": "2014-03-28T16:29:45Z",
        "uploaded-by-userId": "999",
        "description": "",
        "comments-count": "0",
        "version-id": "32",
        "private": "0",
        "download-URL": "http://demo1company.teamwork.com/?action=viewFile&sd=35e756ad...",
        "category-id": "13",
        "project-name": "demo",
        "version": "1",
        "originalName": "readme.txt",
        "id": "999",
        "size": "1612",
        "file-source": "teamworkpm",
        "uploaded-by-user-first-name": "Demo",
        "category-name": "Demo Category"
    },
    "STATUS": "OK"
}
 */