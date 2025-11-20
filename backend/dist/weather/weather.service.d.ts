import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { Weather } from './entities/weather.entity';
import { Model } from 'mongoose';
export declare class WeatherService {
    private weatherModel;
    constructor(weatherModel: Model<Weather>);
    create(createWeatherDto: CreateWeatherDto): Promise<Weather>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Weather, {}, {}> & Weather & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: number): string;
    update(id: number, updateWeatherDto: UpdateWeatherDto): string;
    remove(id: number): string;
}
