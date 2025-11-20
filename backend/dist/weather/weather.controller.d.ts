import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
export declare class WeatherController {
    private readonly weatherService;
    constructor(weatherService: WeatherService);
    create(createWeatherDto: CreateWeatherDto): Promise<import("./entities/weather.entity").Weather>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./entities/weather.entity").Weather, {}, {}> & import("./entities/weather.entity").Weather & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): string;
    update(id: string, updateWeatherDto: UpdateWeatherDto): string;
    remove(id: string): string;
}
