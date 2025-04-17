import { Model, FilterQuery, PopulateOptions } from "mongoose";

interface IFindOne<TDoc> {
    filters: FilterQuery<TDoc>,
    select?: string,
    populate?: PopulateOptions[];
}

interface IFind<TDoc> {
    filters?: FilterQuery<TDoc>,
    select?: string,
    populate?: PopulateOptions[];
}

export abstract class BaseRepo<TDoc> {
    constructor(private readonly model: Model<TDoc>) { }
    
    async create(data: Partial<TDoc>): Promise<TDoc> {
        return await this.model.create(data);
    }

    async findOne({
        filters,
        select = '',
        populate = [],
    }   : IFindOne<TDoc>): Promise<TDoc | null> {
        return await this.model.findOne(filters, select).populate(populate);
    }

    async find({
        filters = {},
        select = '',
        populate = [],
    }   : IFind<TDoc>): Promise<TDoc[]> {
        return await this.model.find(filters, select).populate(populate);
    }
    
}