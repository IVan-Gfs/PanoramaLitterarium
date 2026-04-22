import { Pageable } from "./page.response";


export class Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    pageSize: number;
    page: number;
    lastPage: boolean;  

    constructor(
        content: T[],
        totalElements: number,
        pageSize: number,
        page: number,
        totalPages: number,
    ) {
       this.content = content;
       this.totalElements = totalElements;
       this.pageSize = pageSize;
       this.page = page;
        this.totalPages = totalPages;
       this.lastPage = page >= totalPages;
    }

    static of<T>(
        content: T[],
        totalElements: number,
        pageable: Pageable,
    ): Page<T>{
    
        const pageSize = pageable.pageSize;
        const page =  Math.max(1,pageable.page);
        const totalPages = Math.max(1, Math.ceil(totalElements / pageSize));

        return new Page(
           content,
           totalElements,
           pageSize,
           page,
           totalPages
            
        );
    }
}