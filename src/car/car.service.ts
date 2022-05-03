import { Injectable, HttpException } from '@nestjs/common';
import { CARS } from './cars.mock';

@Injectable()
export class CarService {
  private cars = CARS;

  public getCars() {
    return this.cars;
  }

  public postCar(car) {
    return this.cars.push(car);
  }

  public getCarById(id: number): Promise<any> {
    return this.findCarById(id);
  }

  public deleteCarById(id: number) {
    return this.findIndexById(id).then((index) => {
      this.cars.splice(index, 1);
      return this.cars;
    });
  }

  public putCarById(id: number, propertyName: string, propertyValue: string) {
    return this.findIndexById(id).then((index) => {
      this.cars[index][propertyName] = propertyValue;
      return this.cars;
    });
  }

  private findCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const car = this.cars.find((_car) => _car.id === carId);
      if (!car) {
        throw new HttpException('Not found', 404);
      }
      return resolve(car);
    });
  }

  private findIndexById(id: number): Promise<number> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const index = this.cars.findIndex((car) => car.id === carId);
      if (index === -1) {
        throw new HttpException('Not found', 404);
      }
      return resolve(index);
    });
  }
}
