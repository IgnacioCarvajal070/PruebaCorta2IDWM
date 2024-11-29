import { character } from "./character";

export interface ApiResponse {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    }
    results: character[];
}