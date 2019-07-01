export class DockerContainer {
    id: string;
    name: string;
    command: string;
    state: string;
    status: string;

    constructor(id: string, name: string, command: string, state: string, status: string) {
        this.id = id;
        this.name = name;
        this.command = command;
        this.state = state;
        this.status = status;
    }
}
