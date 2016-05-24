
export class Message {

    constructor(
        public id: number,
        public subject: string,
        public body: string,
        public createDate: Date
    ) { }
}