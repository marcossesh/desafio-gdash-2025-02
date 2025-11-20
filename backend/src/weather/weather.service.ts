import { Injectable } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Weather } from './entities/weather.entity';
import { Model } from 'mongoose';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<Weather>,
  ) {}

  async create(createWeatherDto: CreateWeatherDto): Promise<Weather> {
    const createdWeather = new this.weatherModel(createWeatherDto);
    return createdWeather.save();
  }

  findAll() {
    // Já vamos deixar pronto para listar tudo depois
    return this.weatherModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} weather`;
  }

  update(id: number, updateWeatherDto: UpdateWeatherDto) {
    return `This action updates a #${id} weather`;
  }

  remove(id: number) {
    return `This action removes a #${id} weather`;
  }
}