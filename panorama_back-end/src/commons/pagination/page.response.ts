

export class Pageable {
    readonly page: number;
    readonly pageSize: number;
    readonly props: string;
    readonly orderBy: string;
    readonly order: 'ASC' | 'DESC';

    constructor(
        page: number = 1, 
        pageSize: number = 6, 
        props?: string,
        order?: string,
        orderBy?: string,
        private readonly allowedProps: string[] = [],
        private readonly allowedPropsOrder: string[] = []
    ) {
        this.page = page < 1 ? 1 : page;
        this.pageSize = pageSize > 100 ? 100 : pageSize;
        const defaultField = allowedProps[0];
        const defaultFieldOrder = allowedPropsOrder[0];
        this.props = allowedProps.includes(props ?? '') ? props! : defaultField;
        this.order = order?.toLocaleUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        this.orderBy = allowedPropsOrder.includes(orderBy ?? '') ? orderBy! : defaultFieldOrder; 
    }

    get offset(): number {
        return (this.page - 1) * this.pageSize;
    }

    get limit(): number {
        return this.pageSize;
    }
}

