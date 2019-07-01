export class ContainerDetail {
    id: string;
    name: string;
    created: string;
    state: string;
    mounts: string;
    environment: string[];
    command: string;
    workingDirectory: string;
    ip: string;
    ports: string;
}
