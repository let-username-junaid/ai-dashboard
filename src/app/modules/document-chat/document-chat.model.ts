export interface FileDetails{
    _id: string;
    createdOn: string;
    extension: string;
    numberOfToken: number;
    originalFileName: string;
    savedFileName: string;
    totalCost: number;
}

export interface ChatData{
    answer: string;
    chat_history: string[][];
    question: string
}

export interface Chat{
    id:number;
    question:string;
    answer:string;
    isGeneratingAnswer:boolean;
    isError:boolean
}