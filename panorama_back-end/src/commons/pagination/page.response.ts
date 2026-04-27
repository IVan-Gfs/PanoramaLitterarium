

export class Pageable {
    readonly page: number;
    readonly pageSize: number;
    readonly props: string;
    readonly order: 'ASC' | 'DESC';

    constructor(
        page: number = 1, 
        pageSize: number = 6, 
        props?: string,
        order?: string,
        private readonly allowedProps: string[] = [],
    ) {
        this.page = page < 1 ? 1 : page;
        this.pageSize = pageSize > 100 ? 100 : pageSize;
        const defaultField = allowedProps[0];
        this.props = allowedProps.includes(props ?? '') ? props! : defaultField;
        this.order = order?.toLocaleUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    }

    get offset(): number {
        return (this.page - 1) * this.pageSize;
    }

    get limit(): number {
        return this.pageSize;
    }
}

